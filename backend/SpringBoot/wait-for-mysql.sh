#!/bin/bash
set -e

host="$1"
shift
cmd="$@"

until mysqladmin ping -h "$host" --silent; do
  echo "MySQL no está listo todavía..."
  sleep 1
done

echo "MySQL está listo. Iniciando la aplicación..."
exec $cmd
