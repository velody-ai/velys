# Breadcrumb

Navigation trail. Compound: `Breadcrumb` (nav landmark) / `BreadcrumbList` / `BreadcrumbItem` / `BreadcrumbLink` / `BreadcrumbPage` / `BreadcrumbSeparator`.

```tsx
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem,
  BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator,
} from "@velody/velys";
```

## Props
- **Breadcrumb**: `<nav aria-label="Breadcrumb">` — native `HTMLAttributes`.
- **BreadcrumbList**: `<ol>`. **BreadcrumbItem**: `<li>`.
- **BreadcrumbLink**: `<a>` — anchor attributes (`href`, …).
- **BreadcrumbPage**: `<span aria-current="page">` for the current page.
- **BreadcrumbSeparator**: `<li aria-hidden>`; defaults to a chevron, override via `children`.

## Examples
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Details</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```
