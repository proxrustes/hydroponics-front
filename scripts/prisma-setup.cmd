npx prisma-case-format --map-table-case snake --map-field-case snake --file "./prisma/schema.prisma"
npx prisma generate
npx prisma migrate reset --force
