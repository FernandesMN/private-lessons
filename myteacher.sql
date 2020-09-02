CREATE TABLE "teachers" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text,
  "name" text,
  "birth_date" timestamp,
  "education_level" text,
  "classtype" text,
  "acting" text,
  "created_at" timestamp
);

CREATE TABLE "students" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text,
  "name" text,
  "birth_date" timestamp,
  "school_year" text,
  "workload" text,
  "teacher_id" int
);
