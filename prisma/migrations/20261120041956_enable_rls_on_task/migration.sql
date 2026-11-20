-- prisma/migrations/（日時）_enable_rls_on_task/migration.sql
-- Data API から Task テーブルを直接読み書きさせない
ALTER TABLE "Task" ENABLE ROW LEVEL SECURITY;