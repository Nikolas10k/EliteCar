# Elite Car Veículos

Landing page e catálogo de anúncios de veículos — Next.js 16, React 19 e Tailwind CSS 4.

## Rodando

```bash
npm install
npm run dev
```

Abra http://localhost:3000.

## Estrutura

- `src/app/page.tsx` — composição da landing page
- `src/components/landing/` — seções (Hero, Catálogo, Como funciona, Benefícios, Painel, CTA)
- `src/components/brand/EliteLogo.tsx` — logo em SVG animável
- `src/lib/vehicles.ts` — tipo `Vehicle` e dados de demonstração
- `supabase/schema.sql` — tabela `vehicles`, RLS e bucket de fotos para o Supabase
