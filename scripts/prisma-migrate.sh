#!/bin/sh

# Capturar argumentos
SCHEMA_PATH=""
MIGRATION_NAME=""

while [ $# -gt 0 ]; do
  case "$1" in
    --schema=*)
      SCHEMA_PATH="${1#*=}"
      ;;
    --name=*)
      MIGRATION_NAME="${1#*=}"
      ;;
    *)
      echo "❌ Opção inválida: $1"
      exit 1
      ;;
  esac
  shift
done

# Verificar se o caminho do schema foi informado
if [ -z "$SCHEMA_PATH" ]; then
  echo "⚠️  Erro: Caminho do schema Prisma obrigatório! Use --schema=<path>"
  exit 1
fi

# Verificar se o nome da migração foi informado
if [ -z "$MIGRATION_NAME" ]; then
  echo "⚠️  Erro: Nome da migração obrigatório! Use --name=<migration_name>"
  exit 1
fi

# Executar Prisma Migrate
echo "🚀 Rodando migração para o schema: $SCHEMA_PATH"
npx prisma migrate dev --schema="$SCHEMA_PATH" --name="$MIGRATION_NAME"
