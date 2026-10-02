// Original StyleSpec archetypes. No third-party template code or assets are included.
export const newArchetypes = [
  {
    "id": "product-console",
    "name": "Product Console",
    "domain": "tool",
    "description": "An install-first developer landing page with a working console as the opening surface.",
    "tags": [
      "tool",
      "console",
      "dense"
    ],
    "status": "active",
    "composition": {
      "navigation": "top",
      "heroStructure": "split",
      "heroPriority": "tool-first",
      "ctaModel": "install-docs",
      "contentRhythm": "dense",
      "grid": "asymmetric",
      "informationDensity": "compact",
      "sectionTransition": "border",
      "pageStructure": "console"
    },
    "previewDefaults": {
      "colorMode": "dark",
      "accent": "emerald",
      "typography": "mono",
      "radius": "slight",
      "density": "compact",
      "neutralTone": "warm",
      "surface": "border",
      "hover": "border",
      "focusMotion": "gentle",
      "textBehavior": "wrap",
      "iconStyle": "outline"
    },
    "brandMotifs": {
      "logoTreatment": "Wordmark",
      "decorativeMotif": "Terminal window",
      "signatureComponent": "Install command"
    },
    "sections": [
      {
        "type": "Live console",
        "emphasis": "Primary"
      },
      {
        "type": "Install",
        "emphasis": "Supporting"
      },
      {
        "type": "API examples",
        "emphasis": "Supporting"
      }
    ],
    "templateDetails": [],
    "preview": {
      "kind": "product-console",
      "label": "Product Console"
    },
    "research": {
      "provenance": "Original StyleSpec composition; third-party references used for conceptual research only",
      "license": "Original",
      "reviewedAt": "2026-10-02"
    }
  },
  {
    "id": "personal-archive",
    "name": "Personal Archive",
    "domain": "portfolio",
    "description": "A folder-like portfolio organized as browsable project records.",
    "tags": [
      "portfolio",
      "project-index",
      "index"
    ],
    "status": "active",
    "composition": {
      "navigation": "index",
      "heroStructure": "none",
      "heroPriority": "image-first",
      "ctaModel": "inline",
      "contentRhythm": "index",
      "grid": "asymmetric",
      "informationDensity": "balanced",
      "sectionTransition": "border",
      "pageStructure": "project-index"
    },
    "previewDefaults": {
      "colorMode": "light",
      "accent": "amber",
      "typography": "serif",
      "radius": "slight",
      "density": "normal",
      "neutralTone": "warm",
      "surface": "border",
      "hover": "border",
      "focusMotion": "gentle",
      "textBehavior": "wrap",
      "iconStyle": "outline"
    },
    "brandMotifs": {
      "logoTreatment": "Wordmark",
      "decorativeMotif": "Folder tabs",
      "signatureComponent": "Indexed project folders"
    },
    "sections": [
      {
        "type": "Archive tabs",
        "emphasis": "Primary"
      },
      {
        "type": "Project records",
        "emphasis": "Supporting"
      },
      {
        "type": "Contact",
        "emphasis": "Supporting"
      }
    ],
    "templateDetails": [],
    "preview": {
      "kind": "personal-archive",
      "label": "Personal Archive"
    },
    "research": {
      "provenance": "Original StyleSpec composition; third-party references used for conceptual research only",
      "license": "Original",
      "reviewedAt": "2026-10-02"
    }
  },
  {
    "id": "world-portal",
    "name": "World Portal",
    "domain": "game",
    "description": "An illustrated game world navigated through chapters and a quest board.",
    "tags": [
      "game",
      "cinematic-game",
      "narrative"
    ],
    "status": "active",
    "composition": {
      "navigation": "minimal",
      "heroStructure": "full-screen",
      "heroPriority": "image-first",
      "ctaModel": "single",
      "contentRhythm": "narrative",
      "grid": "asymmetric",
      "informationDensity": "spacious",
      "sectionTransition": "full-bleed",
      "pageStructure": "cinematic-game"
    },
    "previewDefaults": {
      "colorMode": "dark",
      "accent": "amber",
      "typography": "display",
      "radius": "slight",
      "density": "spacious",
      "neutralTone": "warm",
      "surface": "border",
      "hover": "border",
      "focusMotion": "gentle",
      "textBehavior": "wrap",
      "iconStyle": "outline"
    },
    "brandMotifs": {
      "logoTreatment": "Wordmark",
      "decorativeMotif": "World map",
      "signatureComponent": "Quest board"
    },
    "sections": [
      {
        "type": "World entrance",
        "emphasis": "Primary"
      },
      {
        "type": "Map",
        "emphasis": "Supporting"
      },
      {
        "type": "Characters",
        "emphasis": "Supporting"
      },
      {
        "type": "Play",
        "emphasis": "Supporting"
      }
    ],
    "templateDetails": [],
    "preview": {
      "kind": "world-portal",
      "label": "World Portal"
    },
    "research": {
      "provenance": "Original StyleSpec composition; third-party references used for conceptual research only",
      "license": "Original",
      "reviewedAt": "2026-10-02"
    }
  },
  {
    "id": "digital-invitation",
    "name": "Digital Invitation",
    "domain": "wedding",
    "description": "A chaptered invitation flowing from the announcement to event details and RSVP.",
    "tags": [
      "wedding",
      "invitation",
      "journal"
    ],
    "status": "active",
    "composition": {
      "navigation": "hidden",
      "heroStructure": "invitation",
      "heroPriority": "image-first",
      "ctaModel": "rsvp",
      "contentRhythm": "journal",
      "grid": "single-column",
      "informationDensity": "spacious",
      "sectionTransition": "whitespace",
      "pageStructure": "invitation"
    },
    "previewDefaults": {
      "colorMode": "light",
      "accent": "rose",
      "typography": "serif",
      "radius": "slight",
      "density": "spacious",
      "neutralTone": "warm",
      "surface": "border",
      "hover": "border",
      "focusMotion": "gentle",
      "textBehavior": "wrap",
      "iconStyle": "outline"
    },
    "brandMotifs": {
      "logoTreatment": "Wordmark",
      "decorativeMotif": "Invitation seal",
      "signatureComponent": "Event timeline"
    },
    "sections": [
      {
        "type": "Invitation",
        "emphasis": "Primary"
      },
      {
        "type": "Our story",
        "emphasis": "Supporting"
      },
      {
        "type": "Schedule",
        "emphasis": "Supporting"
      },
      {
        "type": "RSVP",
        "emphasis": "Supporting"
      }
    ],
    "templateDetails": [],
    "preview": {
      "kind": "digital-invitation",
      "label": "Digital Invitation"
    },
    "research": {
      "provenance": "Original StyleSpec composition; third-party references used for conceptual research only",
      "license": "Original",
      "reviewedAt": "2026-10-02"
    }
  },
  {
    "id": "search-directory",
    "name": "Search-first Directory",
    "domain": "directory",
    "description": "A curated collection where search and category browsing replace the marketing hero.",
    "tags": [
      "directory",
      "project-index",
      "index"
    ],
    "status": "active",
    "composition": {
      "navigation": "top",
      "heroStructure": "none",
      "heroPriority": "tool-first",
      "ctaModel": "inline",
      "contentRhythm": "index",
      "grid": "traditional",
      "informationDensity": "compact",
      "sectionTransition": "border",
      "pageStructure": "project-index"
    },
    "previewDefaults": {
      "colorMode": "light",
      "accent": "blue",
      "typography": "sans",
      "radius": "rounded",
      "density": "normal",
      "neutralTone": "warm",
      "surface": "border",
      "hover": "border",
      "focusMotion": "gentle",
      "textBehavior": "wrap",
      "iconStyle": "outline"
    },
    "brandMotifs": {
      "logoTreatment": "Wordmark",
      "decorativeMotif": "Category index",
      "signatureComponent": "Search and filter"
    },
    "sections": [
      {
        "type": "Search",
        "emphasis": "Primary"
      },
      {
        "type": "Categories",
        "emphasis": "Supporting"
      },
      {
        "type": "Featured entries",
        "emphasis": "Supporting"
      },
      {
        "type": "Submit",
        "emphasis": "Supporting"
      }
    ],
    "templateDetails": [],
    "preview": {
      "kind": "search-directory",
      "label": "Search-first Directory"
    },
    "research": {
      "provenance": "Original StyleSpec composition; third-party references used for conceptual research only",
      "license": "Original",
      "reviewedAt": "2026-10-02"
    }
  }
];
