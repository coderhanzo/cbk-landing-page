#!/usr/bin/env node
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import sharp from "sharp";

const SOURCE_DIR = path.resolve("public/imgs");
const OUTPUT_DIR = path.resolve("public/images/generated");
const MANIFEST_PATH = path.resolve("src/data/imageManifest.json");
const TARGET_WIDTHS = [320, 480, 768, 1024, 1280, 1600, 1920];
const FORMATS = [
  { name: "avif", extension: "avif", options: { quality: 45 } },
  { name: "webp", extension: "webp", options: { quality: 65 } },
  { name: "jpeg", extension: "jpg", options: { quality: 75, mozjpeg: true } },
];
const PLACEHOLDER_WIDTH = 24;
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

const toPosix = (p) => p.split(path.sep).join("/");

const normalizeKey = (fileName) => toPosix(`/imgs/${fileName}`).toLowerCase();

const sanitizeBaseName = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "image";

const ensureDir = async (dir) => {
  await fs.mkdir(dir, { recursive: true });
};

const cleanOutputDir = async () => {
  await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
  for (const format of FORMATS) {
    await ensureDir(path.join(OUTPUT_DIR, format.name));
  }
};

const generatePlaceholder = async (sourcePath) => {
  const buffer = await sharp(sourcePath)
    .resize({ width: PLACEHOLDER_WIDTH })
    .blur()
    .jpeg({ quality: 35 })
    .toBuffer();
  return `data:image/jpeg;base64,${buffer.toString("base64")}`;
};

const calculateWidths = (originalWidth) => {
  const maxConfigured = TARGET_WIDTHS[TARGET_WIDTHS.length - 1];
  if (!originalWidth) return TARGET_WIDTHS.slice();

  const widths = TARGET_WIDTHS.filter((width) => width <= originalWidth);
  const clampedSource = Math.min(originalWidth, maxConfigured);

  if (!widths.length) {
    widths.push(clampedSource);
  } else if (!widths.includes(clampedSource)) {
    widths.push(clampedSource);
  }

  if (originalWidth < TARGET_WIDTHS[0]) {
    widths.push(originalWidth);
  }

  return [...new Set(widths)].sort((a, b) => a - b);
};

const buildOutputPath = (formatName, fileName) =>
  path.join(OUTPUT_DIR, formatName, fileName);

const toRelativePublicPath = (formatName, fileName) =>
  toPosix(path.posix.join("/images/generated", formatName, fileName));

const hashBuffer = (buffer) =>
  crypto.createHash("md5").update(buffer).digest("hex").slice(0, 8);

const processImage = async (fileName) => {
  const sourcePath = path.join(SOURCE_DIR, fileName);
  const baseName = sanitizeBaseName(path.parse(fileName).name);
  const metadata = await sharp(sourcePath).metadata();
  const widths = calculateWidths(metadata.width);
  const placeholder = await generatePlaceholder(sourcePath);

  const manifestEntry = {
    width: metadata.width ?? TARGET_WIDTHS[TARGET_WIDTHS.length - 1],
    height: metadata.height ?? TARGET_WIDTHS[TARGET_WIDTHS.length - 1],
    placeholder,
    sources: {},
  };

  for (const format of FORMATS) {
    manifestEntry.sources[format.name] = [];
  }

  for (const format of FORMATS) {
    for (const width of widths) {
      const buffer = await sharp(sourcePath)
        .resize({ width, withoutEnlargement: true })
        .toFormat(format.name, format.options)
        .toBuffer();

      const hash = hashBuffer(buffer);
      const fileLabel = `${baseName}-${width}-${hash}.${format.extension}`;
      const outputPath = buildOutputPath(format.name, fileLabel);
      await fs.writeFile(outputPath, buffer);
      manifestEntry.sources[format.name].push({
        width,
        src: toRelativePublicPath(format.name, fileLabel),
      });
    }
  }

  for (const format of FORMATS) {
    manifestEntry.sources[format.name].sort((a, b) => a.width - b.width);
  }

  return manifestEntry;
};

const main = async () => {
  const manifest = {};

  try {
    await ensureDir(path.dirname(MANIFEST_PATH));
    try {
      await fs.access(SOURCE_DIR);
    } catch (error) {
      throw new Error(`Source directory "${SOURCE_DIR}" not found.`);
    }

    await cleanOutputDir();

    const files = await fs.readdir(SOURCE_DIR);
    const filteredFiles = files.filter((file) =>
      SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase())
    );

    if (!filteredFiles.length) {
      console.warn("No source images detected. Manifest will be empty.");
    }

    for (const fileName of filteredFiles) {
      const entry = await processImage(fileName);
      manifest[normalizeKey(fileName)] = entry;
      console.log(`Optimized ${fileName}`);
    }

    await fs.writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
    console.log(
      `Wrote manifest for ${Object.keys(manifest).length} assets to ${toPosix(
        path.relative(process.cwd(), MANIFEST_PATH)
      )}`
    );
  } catch (error) {
    console.error("[images:optimize] Failed:", error);
    process.exitCode = 1;
  }
};

await main();
