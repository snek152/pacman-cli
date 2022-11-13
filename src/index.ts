// import { readdirSync, readFileSync, writeFileSync } from "fs";
// import { join } from "path";
import child_process from "child_process";
import chalk from "chalk";
import { readdirSync } from "fs";
import yargs from "yargs";
import path from "path";
import shell from "shelljs";

function throwError(message: string) {
  console.log(chalk.bgRed(" ERROR "), chalk.red(message));
  process.exit();
}

const argv = yargs
  .options({
    default: {
      alias: "d",
      type: "string",
      description: "Package manager to use by default",
    },
    dir: {
      type: "string",
      description:
        "Directory to install packages in, if not provided will use current working directory",
    },
  })
  .parseSync();
if (argv.default && !["pnpm", "yarn", "npm"].includes(argv.default)) {
  throwError("Please provide a valid package manager");
}
const dir = argv.dir ? path.join(process.cwd(), argv.dir) : process.cwd();

let pms: string[] = [];
const files = readdirSync(dir);
if (files.includes("pnpm-lock.yaml") || files.includes("pnpm-lock.yml")) {
  pms.push("pnpm");
}
if (files.includes("yarn.lock")) {
  pms.push("yarn");
}
if (files.includes("package-lock.json")) {
  pms.push("npm");
}

let pmToUse = "";

if (pms.length != 1) {
  if (!argv.default) {
    throwError(
      pms.length == 0
        ? "No package manager detected, please provide a default option using -d"
        : "Multiple package managers detected, please provide a default option using -d"
    );
  }
  pmToUse = argv.default!;
} else {
  pmToUse = pms[0];
}

console.log("Using", chalk.green(pmToUse.toUpperCase()));

shell.cd(dir);
const output = shell.exec(`${pmToUse} install`, { silent: true });

if (output.stderr) {
  throwError(output);
}
console.log(output.stdout);
