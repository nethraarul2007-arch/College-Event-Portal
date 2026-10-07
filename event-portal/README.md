# College Event Portal

A responsive, multi-page website for a college festival. It shows event information, a day-wise schedule, announcements, a registration form, a photo gallery and a contact page. Built with plain HTML5, CSS3 and JavaScript, so there is nothing to install or build.

**Live site:** _add your hosted link here_
**Repository:** _add your GitHub link here_

## Pages and features

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Hero, live countdown to the fest, event count, featured events, announcements |
| Events | `events.html` | Search, category filters, event cards, day-wise schedule with tabs |
| Register | `register.html` | Registration form with validation, event checkboxes, running fee total, confirmation with a registration ID |
| Gallery | `gallery.html` | Category filter, photo grid, keyboard-friendly lightbox |
| Contact | `contact.html` | Contact form with validation, FAQ, organiser details |

## Skills demonstrated

- **HTML5:** semantic landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`), `details`/`summary`, `fieldset`/`legend`, `time`, labelled form controls.
- **CSS3:** custom properties, Grid and Flexbox, mobile-first media queries (640px and 900px breakpoints), sticky header, responsive table scrolling, `prefers-reduced-motion`.
- **Responsive design:** one column on phones, two on tablets, three or four on desktop; hamburger menu below 900px.
- **JavaScript DOM manipulation:** all lists and cards are created with `createElement` from data in `js/data.js`; live search and filtering; tabs; countdown timer; form validation with inline error messages; lightbox; `localStorage` for registrations.

## Project structure

```
index.html, events.html, register.html, gallery.html, contact.html
css/style.css        all styles
js/data.js           festival name, dates, events, announcements, gallery items
js/main.js           all behaviour, one init function per page
images/              put real photos here
```

## Customise it

Everything you are likely to change is in `js/data.js`:

- `SITE`: fest name, college name, start date (drives the countdown), contact email and phone.
- `EVENTS`: add, remove or edit events. Each needs a unique `id`, `category`, `day` (1 to 3), `time`, `venue`, `fee` and `desc`.
- `ANNOUNCEMENTS`: newest first.
- `GALLERY`: add `src: "images/your-photo.jpg"` to an item to use a real photo. Items without `src` show a coloured tile.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

**GitHub Pages:** push the repo, then Settings → Pages → Deploy from branch → `main` / root. Your link will be `https://<username>.github.io/<repo-name>/`.

**Netlify:** drag the project folder onto app.netlify.com/drop.

## How data is handled

There is no backend. Registrations are saved in the visitor's own browser (`localStorage` key `registrations`) and the contact form opens the visitor's email app with the message filled in. To collect real submissions, connect the forms to a service such as Formspree, Google Forms or a small server API.

## Testing checklist

- [ ] Menu opens and closes on a phone-width screen; Esc closes it
- [ ] Event search and category filters update the list and the status message
- [ ] Schedule tabs switch between the three days
- [ ] Clicking Register on an event card preselects that event in the form
- [ ] Empty registration form shows errors; valid form shows a registration ID
- [ ] Gallery lightbox works with mouse, arrow keys and Esc
- [ ] Contact form validates and opens the email app
- [ ] No horizontal scrolling at 360px width
- [ ] Everything can be used with the keyboard only

## Accessibility

Skip link, visible focus outlines, labelled inputs with `aria-invalid` and live error messages, `aria-pressed` and `aria-selected` on filters and tabs, dialog semantics on the lightbox, and reduced-motion support.

## Possible improvements

Seat limits per event, team registrations, an admin page to export registrations, and a dark mode.

## Credits

Fonts: Unbounded and Manrope from Google Fonts. Replace the placeholder text and tiles with your own college content and photos.
