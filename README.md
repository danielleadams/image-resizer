# Image Resizer
![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)

## Installation

These are instructions for installation on MacOS. If you are running Windows or Linux, try to follow the steps with the respective OS libraries/commands.

1. Clone this repo

```sh
git clone git@github.com:danielleadams/image-resizer.git
cd image-resizer
```

2. Install Node. The easiest way is to probably use a version manager. I like `nodenv`. This project uses a version file that works with `nodenv`, so it is preferred.

```sh
# install Homebrew ([brew.sh](https://brew.sh/))
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# install nodenv
brew install nodenv

# set up nodenv in shell
eval "$(nodenv init -)"
```

3. Install yarn.

```sh
npm install -g yarn
```

4. Install dependencies.

```sh
yarn
```

5. Set binaries to `PATH`.

```sh
PATH="./node_modules/.bin:$PATH"
```

## Usage

Now you're ready to run the server. To start the server, run:

```sh
yarn start
```

To see the input, visit [localhost:3000/upload](localhost:3000/upload) to upload a photo.

## Analysis

There are a few scripts that can be run.

### Formatting

This project uses [prettier](https://github.com/prettier/prettier). There's a few scripts that can be run:

```sh
yarn format:check # check for format conflicts
yarn format:fix # fixes pending conflicts
yarn format:list # prints the files that are not formatted
```

### Dependency Vulnerabilities

This project uses [retire.js](https://github.com/RetireJS/retire.js) to run a static analysis of the dependencies (the `node_modules` directory) to look for vulnerabilities down the dependency tree.

```sh
yarn deps:scan # outputs all dependency tree with vulnerabilities
```

Sample output looks like this:

```sh
/Users/danielle.adams/Code/image-resizer/node_modules/source-map-resolve/bower.json
 ↳ source-map-resolve 0.5.2
/Users/danielle.adams/Code/image-resizer/node_modules/source-map-url/bower.json
 ↳ source-map-url 0.4.0
 ```
