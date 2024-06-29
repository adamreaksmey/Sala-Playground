class SQLMethods {
  constructor(readonly tableName: string) {}

  public _insert(columns: any[], values: any[]): string {
    const query = `
    INSERT INTO public.${this.tableName} (${columns
      .map((column) => `"${column}"`)
      .join(', ')}) VALUES (${values
      .map((value: any) => (value === "''" ? 'NULL' : value))
      .join(', ')});
    `

    return query
  }

  public _update(updateSet: any, config: any, idValue: any): string {
    const query: string = `
        UPDATE public.${this.tableName}
        SET ${updateSet}
        WHERE "${config.idColumn}" = ${idValue}; 
    `

    return query
  }

  public _updateOrCreate(
    updateSet: any,
    config: any,
    idValue: string,
    columns: any[],
    values: any[]
  ): string {
    // Prepare the UPDATE and INSERT parts
    const updatePart: string = `UPDATE public.${this.tableName} SET ${updateSet} WHERE "${config.idColumn}" = ${idValue};`
    const insertPart: string = `INSERT INTO public.${this.tableName} ("${columns.join('", "')}") VALUES (${values.join(', ')})`

    // Construct the full conditional query
    const query: string = `
      DO $$
      BEGIN
        IF EXISTS (SELECT 1 FROM public.${this.tableName} WHERE "${config.idColumn}" = ${idValue}) THEN
          ${updatePart}
        ELSE
          ${insertPart};
        END IF;
      END $$;
    `

    return query
  }
}
