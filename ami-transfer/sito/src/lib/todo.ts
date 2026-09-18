// I segnaposto "DA CONFERMARE" servono alla revisione con l'azienda.
// Al go-live si nascondono con NEXT_PUBLIC_HIDE_TODO=1, insieme alle
// sezioni che senza quei dati resterebbero vuote.
export const SHOW_TODO = process.env.NEXT_PUBLIC_HIDE_TODO !== "1";
