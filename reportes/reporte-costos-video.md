# Reporte ejecutivo — Costos de generación de video

**Histórico Ark vs. nuevo flujo por gateway**  
**Formato futuro:** 11 s · 1080×1920 vertical

## Resumen

- Facturado Ark (227 tareas retenidas): **≈ USD 359**
- Factura real estimada incluyendo tareas que Ark ya no retiene: **USD 360–390**
- Gateway equivalente para el mismo trabajo histórico: **≈ USD 43**
- Ahorro estimado: **≈ USD 316 / 88%**
- Costo futuro gateway, 11 s a 1080×1920: **USD 0,6479 por video**
- Costo histórico comparable Ark, 11 s a 1080p: **≈ USD 5,74 por video**
- Diferencia: **≈ 8,9× menos costo**

## Histórico Ark

| Modelo | Formato | Videos OK | Segundos | Tokens | Costo |
|---|---:|---:|---:|---:|---:|
| Seedance 2.5 | 1080p / 11s | 60 | 660 | 32.198M | USD 344,51 |
| Seedance 2.0-mini | 720p / 5s | 23 | 115 | 2.505M | USD 8,77 |
| Seedance 2.5 | 720p / 5s | 3 | 15 | 0.327M | USD 3,50 |
| Seedance 2.5 | 720p / 11s | 1 | 11 | 0.239M | USD 2,55 |
| **Total** | | **87** | **801** | **35.267M** | **≈ USD 359** |

Las 47 filas adicionales con `task_id` que Ark ya no retiene podrían sumar como máximo ≈ USD 29. Como varias fallaron, el total real se estima en **USD 360–390**.

## Dónde se perdió el presupuesto

De los 35.267M tokens facturados, **20.431M (57,9%) no dejaron un MP4 conservado**.

| Destino | Tareas | Tokens | USD aprox. |
|---|---:|---:|---:|
| Transcode HEVC→H.264 fallido (`ffmpeg-static ENOENT`) | 33 | 17.709M | **≈ USD 189** |
| Pagadas y después borradas | 25 | 2.723M | ≈ USD 30 |
| Entregadas y conservadas | 29 | 14.836M | ≈ USD 140 |

El gateway devuelve **avc1** directamente, eliminando estructuralmente el punto de falla del transcode.

## Proyección futura — siempre 11 s / 1080×1920

| Videos | Ark equivalente | Gateway nuevo | Ahorro aprox. |
|---:|---:|---:|---:|
| 100 | USD 574,18 | **USD 64,79** | **USD 509,39** |
| 500 | USD 2.870,92 | **USD 323,95** | **USD 2.546,97** |
| 1.000 | USD 5.741,83 | **USD 647,90** | **USD 5.093,93** |
| 5.000 | USD 28.709,17 | **USD 3.239,50** | **USD 25.469,67** |

## Inventario

- Ark, tareas exitosas: **87**
- Gateway (openrouter), exitosas: **5**
- Total generado: **92**
- MP4 vivos en bucket: **85**
- MP4 huérfanos de filas borradas: **2**
- Filas DB que nunca llegaron a Ark (`task_id` ausente, costo 0): **575**

Gasto real observado del modelo nuevo: **USD 1,4018 por 5 videos**. Para presupuesto futuro se usa la tarifa medida a 1080p: **USD 0,0589/s × 11 s = USD 0,6479 por video**.

## Conclusión

El cambio a `seedance-1-5-pro` por gateway no solo reduce el costo unitario en aproximadamente **88%**, sino que también elimina el punto técnico que causó la mayor pérdida histórica. La optimización depende de mantenerse en `seedance-1-5-pro`; volver a `seedance-2.5` puede elevar significativamente el costo.