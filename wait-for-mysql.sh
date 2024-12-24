#!/bin/bash
set -e

host="$1"
shift
cmd="$@"

until nc -z -v -w30 "$host" 3306; do
  echo "MySQL no está listo todavía..."
  sleep 1
done

echo "MySQL está listo. Iniciando phpMyAdmin..."
exec $cmd