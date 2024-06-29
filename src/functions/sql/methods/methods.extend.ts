class CustomizedMethods extends SQLMethods {
  constructor(readonly tableName: string) {
    super(tableName)
  }

  public _customMethods(
    config: any,
    idValue: any,
    updateSet: any,
    columns: any[],
    values: any[]
  ): string {
    const query: string = `
    DO $$
    BEGIN
      IF EXISTS (SELECT 1 FROM public.user WHERE "userNumberId" = ${idValue}) THEN
        IF EXISTS (SELECT 1 FROM public.${this.tableName} WHERE "${
          config.idColumn
        }" = ${idValue}) THEN
          UPDATE public.${this.tableName} SET ${updateSet} WHERE "${
            config.idColumn
          }" = ${idValue};
        ELSE
          INSERT INTO public.${this.tableName} (${columns
            .map((col) => `"${col}"`)
            .join(', ')}) VALUES (${values
            .map((value) => (value === "''" ? 'NULL' : value))
            .join(', ')});
        END IF;
      END IF;
    END $$;
    `

    return query
  }
}
