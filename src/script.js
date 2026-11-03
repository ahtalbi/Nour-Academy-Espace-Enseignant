import { eleves, groupes } from "./assets/data.js";

// afficher les elevees
const elevesContainer = document.getElementById("liste-eleves");
const elevesElements = eleves.map(creerLigne);

elevesContainer.append(...elevesElements);
updateGlobalStatus();

// calculer la moyenne 
function moyenneEleve(eleve) {
    if (eleve.notes.length === 0) return null;
    return eleve.notes.reduce((total, note) => total + note, 0) / eleve.notes.length;
}

// update global status
function updateGlobalStatus() {
    const notes = eleves.flatMap(eleve => eleve.notes);
    const totalAbsences = eleves.reduce((total, eleve) => total + eleve.absences, 0);
    const alertedEleves = eleves.filter(eleve => eleve.absences >= 3);
    const meilleureMoyenne = eleves.map(eleve => ({ eleve, moyenne: moyenneEleve(eleve) })).filter(item => item.moyenne !== null).sort((a, b) => b.moyenne - a.moyenne)[0];

    const formatNote = note => Number(note.toFixed(1)).toString().replace(".", ",");
    const moyenneGroupe = notes.length ? notes.reduce((total, note) => total + note, 0) / notes.length : null;

    document.getElementById("bilan-moyenne").textContent = moyenneGroupe === null ? "—" : formatNote(moyenneGroupe);
    document.getElementById("bilan-absences").textContent = totalAbsences;
    document.getElementById("bilan-alertes").textContent = alertedEleves.length;
    document.getElementById("bilan-meilleur").textContent = meilleureMoyenne ? `${meilleureMoyenne.eleve.prenom} ${meilleureMoyenne.eleve.nom} — ${formatNote(meilleureMoyenne.moyenne)} / 20` : "—";

    const listeParents = document.getElementById("liste-parents");
    listeParents.replaceChildren();

    alertedEleves.forEach(eleve => {
        const ligne = document.createElement("li");
        ligne.classList.add("rounded-xl", "bg-card", "px-3", "py-2", "ring-1", "ring-line");
        ligne.textContent = `${eleve.prenom} ${eleve.nom} — ${eleve.telephoneParent}`;
        listeParents.append(ligne);
    });

    document.getElementById("aucune-alerte").hidden = alertedEleves.length > 0;
}

function creerLigne(eleve) {
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

    const badgeParents = document.createElement("span");
    badgeParents.classList.add("badge", "ml-1", "whitespace-nowrap", "rounded-full", "bg-alert", "px-2", "py-0.5", "text-xs", "font-medium", "text-white");
    badgeParents.textContent = "Prévenir les parents";

    function mettreAJourAlerte() {
        const alerte = eleve.absences >= 3;
        li.classList.toggle("alerte", alerte);
        badgeParents.hidden = !alerte;
    }

    mettreAJourAlerte();

    // span grade
    const spanGrade = document.createElement("span");
    spanGrade.classList.add("font-serif", "text-xl");
    spanGrade.textContent = (eleve.notes.length === 0) ? "—" : `${Number((eleve.notes.reduce((cr, pr) => pr + cr) / eleve.notes.length).toFixed(1))} / 20`.replace('.', ',');

    // append button elements
    spanInfo.append(spanName, spanAbsences, badgeParents);
    button.append(spanProfile, spanInfo, spanGrade);

    // actions div
    const actions = document.createElement("div");
    actions.classList.add("flex", "gap-2");

    // absent button
    const buttonAbsent = document.createElement("button");
    buttonAbsent.type = "button";
    buttonAbsent.classList.add("btn-absent", "h-11", "rounded-full", "border", "border-line", "px-3", "sm:px-4", "text-sm", "font-medium", "hover:bg-paper", "hover:cursor-pointer");
    buttonAbsent.textContent = "Absent";


    let absent = false;

    buttonAbsent.addEventListener("click", () => {
        absent = !absent;

        eleve.absences += absent ? 1 : -1;
        spanAbsences.textContent = `${eleve.absences} absence${eleve.absences > 1 ? "s" : ""}`;
        mettreAJourAlerte();
        updateGlobalStatus();

        buttonAbsent.textContent = absent ? "delet absence" : "Absent";
    });

    // input label
    const label = document.createElement("label");
    label.classList.add("flex-1");

    // span for bline people
    const spanForBlindPeople = document.createElement("span");
    spanForBlindPeople.classList.add("sr-only");
    spanForBlindPeople.textContent = "Note sur 20";

    // input of note
    const input = document.createElement("input");
    input.type = "number";
    input.min = "0";
    input.max = "20";
    input.step = "0.5";
    input.placeholder = "Note";
    input.classList.add("h-11", "w-full", "rounded-full", "border", "border-line", "bg-paper", "px-4", "text-sm", "lg:w-24");

    // append to label its elemets
    label.append(spanForBlindPeople, input);

    // botton of ajouter la note
    const buttonNote = document.createElement("button");
    buttonNote.type = "button";
    buttonNote.classList.add("btn-note", "h-11", "rounded-full", "bg-ink", "px-3", "sm:px-4", "text-sm", "font-medium", "text-white", "hover:bg-brand", "hover:cursor-pointer");
    buttonNote.textContent = "Ajouter la note";

    // p inside the li
    const p = document.createElement("p");
    p.classList.add("message", "mt-2", "text-xs", "text-alert");
    p.setAttribute("hidden", true);

    // append to li
    actions.append(buttonAbsent, label, buttonNote);
    div.append(button, actions);
    li.append(div, p);

    return li;
}
