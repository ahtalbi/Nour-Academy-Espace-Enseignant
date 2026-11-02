import { eleves, groupes } from "./assets/data.js";

// ------------- ajouter les eleves -----------------

// <li class="rounded-2xl border border-line bg-card p-3" data-id="1">
//     <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
//         <button type="button" class="btn-fiche flex min-h-11 flex-1 items-center gap-3 text-left">
//             <span class="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-sm font-semibold text-brand">SA</span>
//             <span class="min-w-0 flex-1">
//                 <span class="block truncate font-medium">Sara Alaoui</span>
//                 <span class="block text-sm text-muted">1 absence</span>
//             </span>
//             <span class="font-serif text-xl">13,5 / 20</span>
//         </button>
//         <div class="flex gap-2">
//             <button type="button"
//                 class="btn-absent h-11 rounded-full border border-line px-3 sm:px-4 text-sm font-medium hover:bg-paper">Absent</button>
//             <label class="flex-1">
//                 <span class="sr-only">Note sur 20</span>
//                 <input type="number" min="0" max="20" step="0.5" placeholder="Note"
//                     class="h-11 w-full rounded-full border border-line bg-paper px-4 text-sm lg:w-24">
//             </label>
//             <button type="button"
//                 class="btn-note h-11 rounded-full bg-ink px-3 sm:px-4 text-sm font-medium text-white hover:bg-brand">Ajouter
//                 la note</button>
//         </div>
//     </div>
//     <p class="message mt-2 text-xs text-alert" hidden>La note doit être un nombre entre 0 et 20.</p>
// </li>

// { id: 1,  prenom: "Yassine", nom: "El Amrani", groupeId: 1, telephoneParent: "0661234501", absences: 2, notes: [14, 12.5, 16] },

const elevesContainer = document.getElementById("liste-eleves");
const elevesElements = eleves.map((eleve) => {
    // li element
    const li = document.createElement("li");
    li.dataset.id = eleve.id;
    li.classList.add("rounded-2xl", "border", "border-line", "bg-card", "p-3");
    
    // div inside the li
    const div = document.createElement("div");
    div.classList.add("flex", "flex-col", "gap-3", "lg:flex-row", "lg:items-center");

    // button profile
    const button = document.createElement("button");
    button.type = "button";
    button.classList.add("btn-fiche", "flex", "min-h-11", "flex-1", "items-center", "gap-3", "text-left");

    // spans
    const spanProfile = document.createElement("span");
    spanProfile.classList.add("grid", "size-10", "shrink-0", "place-items-center", "rounded-full", "bg-brand-soft", "text-sm", "font-semibold", "text-brand");
    spanProfile.textContent = eleve.prenom[0] + eleve.nom[0];

    // span infos
    const spanInfo = document.createElement("span");
    spanInfo.classList.add("min-w-0", "flex-1");

    // span name
    const spanName = document.createElement("span");
    spanName.classList.add("block", "truncate", "font-medium");
    spanName.textContent = `${eleve.nom} ${eleve.prenom}`;

    // span abesence
    const spanAbsences = document.createElement("span");
    spanAbsences.classList.add("block", "text-sm", "text-muted");
    spanAbsences.textContent = `${eleve.absences} absence${eleve.absences > 1 ? "s" : ""}`;

    // span grade
    const spanGrade = document.createElement("span");
    spanGrade.classList.add("font-serif", "text-xl");
    spanGrade.textContent = `${eleve.note} / 20`;

    // p inside the li
    const p = document.createElement("p");
    return li;
});

elevesContainer.append(...elevesElements);
