import { onMount } from "svelte";

// Initial values
export const initialState = {
    menuVisible: false,
    isVisible: {} as Record<string, boolean>,
    typedText: "",
    fullText: "I'm Insan Anshary Rasul.",
    typeIndex: 0
};

// Menu functions
export function hideMenu(callback: () => void) {
    return () => {
        callback();
    };
}

export function toggleMenu(callback: () => void) {
    return () => {
        callback();
    };
}

// Typewriter function
export function createTypeWriter(
    fullText: string,
    onTypeUpdate: (text: string, index: number) => void
) {
    let typeIndex = 0;

    function typeWriter() {
        if (typeIndex < fullText.length) {
            onTypeUpdate(fullText.substring(0, typeIndex + 1), typeIndex + 1);
            typeIndex++;
            setTimeout(typeWriter, 100);
        }
    }

    return typeWriter;
}

// Intersection Observer setup
export function setupIntersectionObserver(
    onVisibilityChange: (id: string, isVisible: boolean) => void,
    onTypeWriterStart: () => void
) {
    return onMount(() => {
        // Start typewriter
        onTypeWriterStart();

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        onVisibilityChange(entry.target.id, true);
                    }
                });
            },
            { threshold: 0.3 },
        );

        // Observe sections
        ["about", "skills-section", "projects-section"].forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    });
} 