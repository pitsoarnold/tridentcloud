<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep site-wide navigation, footer, and contact shortcut in the root route via SiteChrome so every content page shares the same presentation.
- Keep pricing content in one shared component so the home and pricing pages show the same plans.
- Submit public contact enquiries through a validated server function into a private Cloud table; never expose enquiry reads to visitors.
