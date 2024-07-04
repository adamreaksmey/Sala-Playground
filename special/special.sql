-- Increment a column that has an incrementation of numbers: 1, 2, 3...  --
-- This function is important when you want you restore a data into an exist table with records but 
-- the record might have duplicated generated PK as numbers, this function will bypass that
-- and allows you to give your incoming data the latest incremented id value instead of using
-- the actual data.
CREATE OR REPLACE FUNCTION increment_column()
RETURNS TRIGGER AS $$
DECLARE
    latest_value integer;
BEGIN
    -- Fetch the latest value of the 'tagId' column
    SELECT COALESCE(MAX("increment-column"), 0) INTO latest_value FROM public.table_name;

    -- Increment the 'tagId' column
    NEW."increment-column" := latest_value + 1;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER increment_on_insert
BEFORE INSERT ON public.table_name
FOR EACH ROW
EXECUTE FUNCTION increment_column();

-- ! WARNING ! --
-- It's important you drop the function after you restored your data.
-- Because having the trigger staying alive will cause your sequence to
-- be consistent and possibly not updating forever.
-- trigger drop --
DROP TRIGGER IF EXISTS increment_on_insert ON public.table_name;
DROP FUNCTION IF EXISTS increment_column();

-- ! NOTICE ! --
-- After you restored the data, removed the function.
-- Set your sequence latest value to the latest according to the last inserted record's 
-- incremented value.
-- Seq update --
ALTER TABLE public.table_name ALTER COLUMN "increment-column" SET DEFAULT nextval('your_sequence');
SELECT setval('your_sequence', GREATEST((SELECT COALESCE(MAX("increment-column"), 0) FROM public.table_name) + 1, 1), false);

-- Insert or ignore trigger
-- Used when you want to ignore a duplicated row instead.
CREATE OR REPLACE FUNCTION check_row_exists()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM public.table_name WHERE "column" = NEW."column") THEN
        RETURN NULL;
    ELSE
        RETURN NEW;
    END IF;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER skip_duplicated_record
BEFORE INSERT ON public.user
FOR EACH ROW
EXECUTE FUNCTION check_row_exists();