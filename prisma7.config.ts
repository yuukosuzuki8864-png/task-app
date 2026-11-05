// prisma7.config.ts（ファイルを丸ごと置き換え）
import "dotenv/config"; // .env の値を読み込む
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma", // 設計図の場所
  migrations: {
    path: "prisma/migrations", // マイグレーションのファイルを置く場所
  },
  datasource: {
    // Prisma のコマンドが使う接続先
    url: process.env["DIRECT_URL"],
  },
});