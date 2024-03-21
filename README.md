# commandline-env
# My CLI EnvKey

My CLI EnvKey is a command-line interface (CLI) tool designed to manage environment variables securely. It allows users to add, update, list, and delete environment variables in a secure manner, leveraging encryption for sensitive data.

## Features

- Securely encrypt and store environment variables.
- Add, update, list, and delete environment variables with ease.
- Utilizes AES-256-CBC encryption for secure data storage.

## Installation

To install My CLI EnvKey, you need to have Node.js and npm installed on your system. Once you have those, you can install the package globally using npm:
bash npm install -g my-cli-envkey


## Usage

After installation, you can use My CLI EnvKey by running the following command in your terminal:

bash my-cli-envkey <command> [options]


### Commands

- `add <name> <value>`: Add a new environment variable.
- `update <name> <newValue>`: Update an existing environment variable.
- `list`: List all environment variables.
- `delete <name>`: Delete an environment variable.

### Options

- `-h, --help`: Display help for the command.

## Examples

To add a new environment variable:

bash my-cli-envkey add mongo localhost


To update an existing environment variable:

bash my-cli-envkey update mongo new_value


To list all environment variables:

bash my-cli-envkey list


To delete an environment variable:

bash my-cli-envkey delete mongo


## Contributing

Contributions are welcome! Please read the [contributing guide](CONTRIBUTING.md) to get started.

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.