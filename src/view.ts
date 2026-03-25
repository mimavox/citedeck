import { ItemView, WorkspaceLeaf } from 'obsidian';

export const VIEW_TYPE_EXAMPLE = 'example-view';

export class ExampleView extends ItemView {
    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return VIEW_TYPE_EXAMPLE;
    }

    getDisplayText() {
        return 'Example view';
    }

    async onOpen() {
        const container = this.contentEl;
        container.empty();
        container.createEl('h4', { text: 'Example view' });
        container.createEl('p', { text: "Andreas Chatzopoulos" });

        const paper = container.createEl('div', { cls: 'paper' });

        const itemOne = paper.createEl('details', { cls: 'citedeck-accordion' });
        itemOne.createEl('summary', { text: 'My fancy paper', cls: 'paper-title' });
        itemOne.createEl('div', { text: 'Lots of content', cls: 'paper-abstract' });

        const itemTwo = paper.createEl('details', { cls: 'citedeck-accordion' });
        itemTwo.createEl('summary', { text: 'Second paper', cls: 'paper-title' });
        itemTwo.createEl('div', { text: 'More content', cls: 'paper-abstract' });

        const itemThree = paper.createEl('details', { cls: 'citedeck-accordion' });
        itemThree.createEl('summary', { text: 'Third paper', cls: 'paper-title' });
        itemThree.createEl('div', { text: 'Even more content', cls: 'paper-abstract' });

        const accordionItems = Array.from(
            paper.querySelectorAll<HTMLDetailsElement>('.citedeck-accordion')
        );

        for (const item of accordionItems) {
            item.addEventListener('toggle', () => {
                if (!item.open) return;

                for (const other of accordionItems) {
                    if (other !== item) other.open = false;
                }
            });
        }
    }

    async onClose() {
        // Nothing to clean up.
    }
}