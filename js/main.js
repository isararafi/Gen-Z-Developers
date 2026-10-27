(() => {
  document.documentElement.classList.add("js-ready");

  const navToggle = document.querySelector(".nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = navMenu ? [...navMenu.querySelectorAll("a")] : [];

  function closeMenu(returnFocus = false) {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Open navigation menu");
    navMenu.classList.remove("is-open");
    document.body.classList.remove("menu-open");
    if (returnFocus) navToggle.focus();
  }

  navToggle?.addEventListener("click", () => {
    const opening = navToggle.getAttribute("aria-expanded") !== "true";
    navToggle.setAttribute("aria-expanded", String(opening));
    navToggle.setAttribute(
      "aria-label",
      opening ? "Close navigation menu" : "Open navigation menu",
    );
    navMenu?.classList.toggle("is-open", opening);
    document.body.classList.toggle("menu-open", opening);
  });

  navLinks.forEach((link) => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      navToggle?.getAttribute("aria-expanded") === "true"
    )
      closeMenu(true);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeMenu();
  });

  const heroSlides = [...document.querySelectorAll(".hero-slide")];
  const heroCurrent = document.querySelector("[data-hero-current]");
  const heroPrev = document.querySelector("[data-hero-prev]");
  const heroNext = document.querySelector("[data-hero-next]");
  const heroToggle = document.querySelector("[data-hero-toggle]");
  let heroIndex = 0;
  let heroTimer = null;
  let heroAutoplay = true;

  function stopHeroTimer() {
    if (heroTimer) window.clearInterval(heroTimer);
    heroTimer = null;
  }

  function startHeroTimer() {
    stopHeroTimer();
    if (!heroAutoplay || document.hidden) return;
    heroTimer = window.setInterval(() => {
      setHeroSlide(heroIndex + 1);
    }, 5500);
  }

  function setHeroSlide(index) {
    if (!heroSlides.length) return;
    heroIndex = (index + heroSlides.length) % heroSlides.length;
    heroSlides.forEach((slide, slideIndex) => {
      const active = slideIndex === heroIndex;
      slide.classList.toggle("is-active", active);
      slide.setAttribute("aria-hidden", String(!active));
    });
    if (heroCurrent)
      heroCurrent.textContent = String(heroIndex + 1).padStart(2, "0");
  }

  function updateHeroToggle() {
    if (!heroToggle) return;
    heroToggle.setAttribute("aria-pressed", String(!heroAutoplay));
    heroToggle.setAttribute(
      "aria-label",
      heroAutoplay ? "Pause automatic slideshow" : "Play automatic slideshow",
    );
    heroToggle.textContent = heroAutoplay ? "Ⅱ" : "▶";
  }

  if (heroSlides.length > 1) {
    heroPrev?.addEventListener("click", () => setHeroSlide(heroIndex - 1));
    heroNext?.addEventListener("click", () => setHeroSlide(heroIndex + 1));
    heroToggle?.addEventListener("click", () => {
      heroAutoplay = !heroAutoplay;
      updateHeroToggle();
      startHeroTimer();
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopHeroTimer();
      else startHeroTimer();
    });
    updateHeroToggle();
    startHeroTimer();
  }

  const revealItems = document.querySelectorAll(".reveal");
  if (
    "IntersectionObserver" in window &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" },
    );
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Add one object per project photo; category filters and counts update automatically.
  const projectPhotos = [
    {
      src: "images/WhatsApp%20Image%202026-10-26%20at%203.50.22%20PM.jpeg",
      category: "Exterior",
      title: "Evening front elevation",
      alt: "5 Marla home exterior in Bahria Town Phase 8, with warm entrance lighting and a boundary wall.",
      description:
        "The home’s street-facing elevation, photographed in the evening.",
    },
    {
      src: "images/pic2.jpeg",
      category: "Kitchen",
      title: "Kitchen and breakfast counter",
      alt: "Finished kitchen with dark cabinetry, a patterned backsplash, a window and a breakfast counter.",
      description:
        "Dark cabinetry and patterned tile add contrast to the bright kitchen.",
    },
    {
      src: "images/pic3.jpeg",
      category: "Exterior",
      title: "Exterior facade detail",
      alt: "Contemporary home facade with a shaded upper porch, large windows and a planted approach.",
      description:
        "A closer view of the home’s facade, windows and shaded porch.",
    },
    {
      src: "images/pic4.jpeg",
      category: "Bathroom",
      title: "Bathroom vanity and tilework",
      alt: "Bathroom vanity with a round mirror, stone-look wall tiles, a white basin and black fixtures.",
      description:
        "Stone-look finishes and black fixtures frame the bathroom vanity.",
    },
    {
      src: "images/pic5.jpeg",
      category: "Ceiling",
      title: "Ceiling design",
      alt: "Ceiling design in the featured 5 Marla home.",
      description: "A view of the finished ceiling design.",
      isPhotoSlot: true,
    },
    {
      src: "images/pic6.jpeg",
      category: "Ceiling",
      title: "Feature ceiling design",
      alt: "Decorative feature ceiling in the featured 5 Marla home.",
      description:
        "A second ceiling view showing the decorative feature finish.",
      isPhotoSlot: true,
    },
    {
      src: "images/pic7.jpeg",
      category: "TV Lounge",
      title: "TV lounge",
      alt: "TV lounge in the featured 5 Marla home.",
      description: "The family TV lounge and its interior finishes.",
      isPhotoSlot: true,
    },
    {
      src: "images/pic8.jpeg",
      category: "Car Porch",
      title: "Car porch wall design",
      alt: "Car porch wall design at the featured 5 Marla home.",
      description: "A closer view of the car porch wall and its finish.",
      isPhotoSlot: true,
    },
    {
      src: "images/pic9.jpeg",
      category: "Exterior",
      title: "Side view of the house",
      alt: "Side elevation of the featured 5 Marla home.",
      description: "A side view of the house exterior.",
      isPhotoSlot: true,
    },
  ];

  const projectGrid = document.querySelector("#project-grid");
  const projectFilters = document.querySelector("#project-filters");
  const projectCount = document.querySelector("#project-count");
  const projectTotal = document.querySelector("[data-project-total]");
  let activeCategory = "all";
  let visiblePhotos = [];
  let currentPhotoIndex = 0;
  let lastPhotoTrigger = null;

  const photoCategories = [
    ...new Set(projectPhotos.map((photo) => photo.category)),
  ];
  const filterOptions = [
    { value: "all", label: "All photos" },
    ...photoCategories.map((category) => ({
      value: category,
      label: category,
    })),
  ];

  function renderProjectFilters() {
    if (!projectFilters) return;
    filterOptions.forEach((option) => {
      const matches =
        option.value === "all"
          ? projectPhotos
          : projectPhotos.filter((photo) => photo.category === option.value);
      const count = matches.filter((photo) => !photo.isPhotoSlot).length;
      const slots = matches.filter((photo) => photo.isPhotoSlot).length;
      const button = document.createElement("button");
      button.className = `filter-button${option.value === activeCategory ? " is-active" : ""}`;
      button.type = "button";
      button.dataset.photoFilter = option.value;
      button.setAttribute(
        "aria-pressed",
        String(option.value === activeCategory),
      );
      button.setAttribute(
        "aria-label",
        `${option.label}: ${count} ${count === 1 ? "photo" : "photos"}${slots ? `, ${slots} photo ${slots === 1 ? "slot" : "slots"}` : ""}`,
      );
      button.append(document.createTextNode(`${option.label} `));
      const countLabel = document.createElement("span");
      countLabel.textContent = slots
        ? `${count}+${slots}`
        : String(count).padStart(2, "0");
      button.append(countLabel);
      projectFilters.append(button);
    });
  }

  function updateProjectCounts() {
    const matches =
      activeCategory === "all"
        ? projectPhotos
        : projectPhotos.filter((photo) => photo.category === activeCategory);
    const photoCount = matches.filter((photo) => !photo.isPhotoSlot).length;
    const slotCount = matches.filter((photo) => photo.isPhotoSlot).length;
    const allPhotoCount = projectPhotos.filter(
      (photo) => !photo.isPhotoSlot,
    ).length;
    const allSlotCount = projectPhotos.filter(
      (photo) => photo.isPhotoSlot,
    ).length;
    const countText = `${photoCount} ${photoCount === 1 ? "photo" : "photos"}${slotCount ? ` and ${slotCount} photo ${slotCount === 1 ? "slot" : "slots"}` : ""}`;
    if (projectCount) projectCount.textContent = `Showing ${countText}`;
    if (projectTotal)
      projectTotal.textContent = `${allPhotoCount} ${allPhotoCount === 1 ? "photo" : "photos"}${allSlotCount ? ` + ${allSlotCount} ${allSlotCount === 1 ? "slot" : "slots"}` : ""}`;
    projectFilters
      ?.querySelectorAll("[data-photo-filter]")
      .forEach((button) => {
        const categoryMatches =
          button.dataset.photoFilter === "all"
            ? projectPhotos
            : projectPhotos.filter(
                (photo) => photo.category === button.dataset.photoFilter,
              );
        const availablePhotos = categoryMatches.filter(
          (photo) => !photo.isPhotoSlot,
        ).length;
        const availableSlots = categoryMatches.filter(
          (photo) => photo.isPhotoSlot,
        ).length;
        const countLabel = button.querySelector("span");
        if (countLabel)
          countLabel.textContent = availableSlots
            ? `${availablePhotos}+${availableSlots}`
            : String(availablePhotos).padStart(2, "0");
        const label =
          filterOptions.find(
            (option) => option.value === button.dataset.photoFilter,
          )?.label ?? "Photos";
        button.setAttribute(
          "aria-label",
          `${label}: ${availablePhotos} ${availablePhotos === 1 ? "photo" : "photos"}${availableSlots ? `, ${availableSlots} photo ${availableSlots === 1 ? "slot" : "slots"}` : ""}`,
        );
      });
  }

  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-image");
  const lightboxTitle = document.querySelector("#lightbox-title");
  const lightboxType = document.querySelector("#lightbox-type");
  const lightboxDescription = document.querySelector("#lightbox-description");
  const lightboxCounter = document.querySelector("#lightbox-count");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxPrevious = document.querySelector("[data-lightbox-previous]");
  const lightboxNext = document.querySelector("[data-lightbox-next]");

  function renderProjectGallery() {
    if (!projectGrid) return;
    visiblePhotos =
      activeCategory === "all"
        ? projectPhotos
        : projectPhotos.filter((photo) => photo.category === activeCategory);
    projectGrid.replaceChildren();

    visiblePhotos.forEach((photo, index) => {
      const card = document.createElement("article");
      card.className = `project-photo-card${index === 0 && !photo.isPhotoSlot ? " is-featured-photo" : ""}${photo.isPhotoSlot ? " is-photo-slot" : ""}`;
      const trigger = document.createElement("button");
      trigger.className = "project-image-button";
      trigger.type = "button";
      trigger.dataset.photoId = String(projectPhotos.indexOf(photo));
      trigger.disabled = Boolean(photo.isPhotoSlot);
      trigger.setAttribute(
        "aria-label",
        photo.isPhotoSlot
          ? `Photo slot: ${photo.title}`
          : `Open photo: ${photo.title}`,
      );

      const image = document.createElement("img");
      image.src = photo.src;
      image.alt = photo.alt;
      image.loading = "lazy";
      image.decoding = "async";
      const addPhotoSlotHint = () => {
        if (trigger.querySelector(".photo-slot-hint")) return;
        const hint = document.createElement("span");
        hint.className = "photo-slot-hint";
        const plus = document.createElement("span");
        plus.className = "photo-slot-plus";
        plus.setAttribute("aria-hidden", "true");
        plus.textContent = "+";
        const status = document.createElement("span");
        status.className = "photo-slot-status";
        status.textContent = "PHOTO TO ADD";
        const message = document.createElement("strong");
        message.textContent = "Photo coming soon";
        hint.append(plus, status, message);
        trigger.prepend(hint);
      };
      if (photo.isPhotoSlot) {
        image.classList.add("is-slot-pending");
        addPhotoSlotHint();
      }
      image.addEventListener(
        "load",
        () => {
          if (!photo.isPhotoSlot) return;
          photo.isPhotoSlot = false;
          image.classList.remove("is-slot-pending");
          card.classList.remove("is-photo-slot");
          trigger.disabled = false;
          trigger.setAttribute("aria-label", `Open photo: ${photo.title}`);
          const hint = trigger.querySelector(".photo-slot-hint");
          hint?.remove();
          updateProjectCounts();
        },
        { once: true },
      );
      image.addEventListener(
        "error",
        () => {
          image.remove();
          if (!photo.isPhotoSlot) {
            photo.isPhotoSlot = true;
            updateProjectCounts();
          }
          card.classList.add("is-photo-slot");
          trigger.disabled = true;
          trigger.setAttribute("aria-label", `Photo slot: ${photo.title}`);
          addPhotoSlotHint();
        },
        { once: true },
      );
      trigger.append(image);

      const expand = document.createElement("span");
      expand.className = "image-expand";
      expand.setAttribute("aria-hidden", "true");
      expand.textContent = "↗";
      trigger.append(expand);

      const caption = document.createElement("span");
      caption.className = "photo-caption";
      const category = document.createElement("span");
      category.className = "photo-category";
      category.textContent = photo.category;
      const title = document.createElement("strong");
      title.textContent = photo.title;
      caption.append(category, title);
      trigger.append(caption);
      card.append(trigger);
      projectGrid.append(card);
    });

    updateProjectCounts();
  }

  function updateLightbox(index) {
    if (!visiblePhotos.length || !lightboxImage) return;
    currentPhotoIndex = (index + visiblePhotos.length) % visiblePhotos.length;
    const photo = visiblePhotos[currentPhotoIndex];
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    if (lightboxTitle) lightboxTitle.textContent = photo.title;
    if (lightboxType) lightboxType.textContent = photo.category;
    if (lightboxDescription)
      lightboxDescription.textContent = photo.description;
    if (lightboxCounter)
      lightboxCounter.textContent = `${currentPhotoIndex + 1} / ${visiblePhotos.length}`;
    if (lightboxPrevious) lightboxPrevious.hidden = visiblePhotos.length < 2;
    if (lightboxNext) lightboxNext.hidden = visiblePhotos.length < 2;
  }

  renderProjectFilters();
  renderProjectGallery();

  projectFilters?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-photo-filter]");
    if (!button) return;
    activeCategory = button.dataset.photoFilter;
    projectFilters.querySelectorAll("[data-photo-filter]").forEach((filter) => {
      const active = filter === button;
      filter.classList.toggle("is-active", active);
      filter.setAttribute("aria-pressed", String(active));
    });
    renderProjectGallery();
  });

  projectGrid?.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-photo-id]");
    if (!trigger || !lightbox) return;
    const photo = projectPhotos[Number(trigger.dataset.photoId)];
    if (!photo || photo.isPhotoSlot) return;
    lastPhotoTrigger = trigger;
    visiblePhotos = projectPhotos.filter(
      (item) =>
        !item.isPhotoSlot &&
        (activeCategory === "all" || item.category === activeCategory),
    );
    updateLightbox(visiblePhotos.indexOf(photo));
    lightbox.showModal();
    lightboxClose?.focus();
  });

  lightboxPrevious?.addEventListener("click", () =>
    updateLightbox(currentPhotoIndex - 1),
  );
  lightboxNext?.addEventListener("click", () =>
    updateLightbox(currentPhotoIndex + 1),
  );
  lightbox?.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") updateLightbox(currentPhotoIndex - 1);
    if (event.key === "ArrowRight") updateLightbox(currentPhotoIndex + 1);
  });
  lightboxClose?.addEventListener("click", () => lightbox?.close());
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox?.addEventListener("close", () => {
    if (lastPhotoTrigger?.isConnected) lastPhotoTrigger.focus();
  });

})();
