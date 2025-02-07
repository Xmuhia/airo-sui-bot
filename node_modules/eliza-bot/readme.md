# Elizabot: Catch content style guide violations

**Elizabot** finds style errors by comparing input text against a set of incorrect terms in the [**retext-intercom**](https://github.com/Skaelv/ic-retext) repo. **Elizabot** explains why your word choices are incorrect according to the Intercom content and documentation style guides (for example, "avoid anthropomorphism"), and suggests alternatives.


You can run **eliza-bot** from the command line, or install plugins for the text editors [Atom](https://github.com/Skaelv/linter-eliza-bot) and [Sublime Text](https://github.com/Skaelv/sublimelinter-eliza-bot) that check your text as you type.

![eliza-bot command line screenshot](rorybot-cmd-screenshot.png)

## Installing

1. Make sure you have [**node.js**](https://nodejs.org/en/download/) installed.
2. Open a Terminal window.
3. Run `npm install -g eliza-bot` to install **eliza-bot**, which will also install **ic-retext** as a module within **eliza-bot**.

If you run into a permissions error, run `sudo npm install -g eliza-bot` instead.

## Updating

1. Open a Terminal window.
2. Run `npm update -g eliza-bot` to update **eliza-bot**, which will also update **ic-retext**.

## Using the Atom linter

Install **eliza-bot**, then see the readme for [**linter-eliza-bot**](https://github.com/Intercom/linter-eliza-bot).

## Using the Sublime Text linter

Install **eliza-bot**, then see the readme for [**sublimelinter-eliza-bot**](https://github.com/Intercom/sublimelinter-eliza-bot).

## Using the command line

You can run **eliza-bot** from the command line for extra functionality.

### Check a specific file

Say `example.md` contains the following text:

```md
Login to the Intercom Manual to customise the Intercom point of sale application.
```

Run **eliza-bot** on `example.md`:

```sh
eliza-bot example.md
```

This yields:

```txt
example.md
1:1-1:9    warning  “Login to” is not Intercom style. Use “log into” instead. (Login is a noun, not a verb.)              login to
1:14-1:28  warning  “Intercom Manual” is not Intercom style. Use “Intercom Help Center” instead. (Incorrect branded name.)  intercom manual
1:32-1:41  warning  “customise” is not Intercom style. Use “customize” instead. (Use American spelling.)                  customise
1:46-1:67  warning  “Intercom point of sale” is not Intercom style. Use “Intercom POS” instead. (Incorrect branded name.)   intercom point of sale

⚠ 4 warnings
```

You can run **eliza-bot** on any text file type, including Ruby.

### Check a directory

When no input files are given to **eliza-bot**, it searches for markdown and text files in the current directory.

If you want to search other types of files, you can use wildcards to create your **eliza-bot** command.

To search all Ruby files within your current directory, for example, run:

```sh
eliza-bot *.rb
```

To search all Ruby files _recursively_ within your current directory, run:

```sh
eliza-bot **/*.rb
```

### Write eliza-bot messages to a file

If you want to write the results of a **eliza-bot** check to a file, use the `tee` command.

```sh
eliza-bot *.rb | tee output.txt
```

### Check a string

If you want to check a string within your terminal:

```sh
echo "Login to the Intercom Manual to customise colours in the Intercom point of sale application." | eliza-bot
```

### Get help

Run `eliza-bot --help` for more information. You can also check out Titus Wormer's [original alex.js application](https://github.com/wooorm/alex) for info about the API, which we haven't looked into yet.

## Contributing

### Add rules

See the readme in [**ic-retext**](https://github.com/Skaelv/ic-retext).

### Make changes to eliza-bot

Create an issue or pull request in this repo.

### Make changes to the Atom linter

See the readme for [**linter-eliza-bot**](https://github.com/Skaelv/linter-elizabot).
