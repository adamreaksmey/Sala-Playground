class SQLMethods {
  constructor(private readonly tableName: string) {}

  public _insert() {
    const query = `
    INSERT INTO public.${item.tableName} (${columns
      .map((column: any) => `"${column}"`)
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
  ) {
    const query: string = `
    IF EXISTS (SELECT 1 FROM public.${this.tableName} WHERE "${config.idColumn}" = ${idValue}) THEN
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
    `

    return query
  }
}
