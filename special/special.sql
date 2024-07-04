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

-- Random column text
CREATE OR REPLACE FUNCTION randomize_case_preserved(input_text TEXT) RETURNS TEXT AS $$
DECLARE
    len INT;
    shuffled TEXT := '';
    i INT;
    char TEXT;
    random_pos INT;
    original_case CHAR;
    remaining_chars TEXT := input_text;
BEGIN
    len := length(input_text);
    FOR i IN 1..len LOOP
        -- Randomly pick a character from the remaining characters
        random_pos := floor(random() * length(remaining_chars)) + 1;
        char := substr(remaining_chars, random_pos, 1);
        -- Remove the picked character from the remaining characters
        remaining_chars := overlay(remaining_chars placing '' from random_pos for 1);
        
        -- Preserve the case of the character
        original_case := substr(input_text, i, 1);
        IF original_case ~ '[A-Z]' THEN
            char := upper(char);
        ELSE
            char := lower(char);
        END IF;
        
        -- Append the randomized character to the shuffled string
        shuffled := shuffled || char;
    END LOOP;
    RETURN shuffled;
END;
$$ LANGUAGE plpgsql;