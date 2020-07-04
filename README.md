# CSV Server

Simple csv server by `.csv` files

## Usage

Install csv-server

```
  npm i
  npm i -g .
```

Start csv-server

```
  csv-server ./data --port=3000
```

Now, go to http://localhost:3000/books or http://localhost:3000/users to see result.

Current, only support `GET` request.

## CLI Option

CLI syntax

```
  csv-server [option] <source>
```

You can see all options by run following command in terminal:

```
  csv-server --help
```
