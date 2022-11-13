# pacman-cli

> A CLI to easily install packages based on the lockfiles in the directory

## Installation

```bash
npm install -g pacman-cli
```

## Usage

```bash
pacman --dir ./optional/directory/to/use -d {pnpm|yarn|npm}
```

## Options

`--dir` - Provide an optional subdirectory to install in
`-d`, `--default` - Provide a default package manager to use in the event of none or multiple being detected

## Motivation

Many open-source projects out there end up with package manager conflicts based on the developers' preferences for specific ones. Experiencing this firsthand, I noticed how annoying it was to have to constantly delete other lockfiles and enforce a single package manager among projects I led and projects I helped out with. Hence, this tool was born.

(Also a friend thought it would be a cool thing to make)
