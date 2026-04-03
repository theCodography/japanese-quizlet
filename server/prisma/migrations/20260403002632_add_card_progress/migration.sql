-- CreateTable
CREATE TABLE "CardProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "cardId" TEXT NOT NULL,
    "rating" TEXT,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CardProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CardProgress_userId_idx" ON "CardProgress"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CardProgress_userId_cardId_key" ON "CardProgress"("userId", "cardId");

-- CreateIndex
CREATE INDEX "GrammarLesson_level_idx" ON "GrammarLesson"("level");

-- CreateIndex
CREATE INDEX "GrammarLesson_textbook_lesson_idx" ON "GrammarLesson"("textbook", "lesson");

-- AddForeignKey
ALTER TABLE "CardProgress" ADD CONSTRAINT "CardProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CardProgress" ADD CONSTRAINT "CardProgress_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;
