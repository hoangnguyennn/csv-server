# CSV Server

Simple csv server by `.csv` files

## Usage

Install csv-server:

```bash
$ npm i
$ npm i -g .
```

Start csv-server:

```bash
# ./data is a directory contains .csv files
$  csv-server ./data --port=3000
```

Now, go to http://localhost:3000/books or http://localhost:3000/users to see result.

Currently, only support `GET` requests.

## CLI Option

CLI syntax:

```bash
$  csv-server [option] <source>
```

You can see all options by run following command in terminal:

```bash
$  csv-server --help
```
