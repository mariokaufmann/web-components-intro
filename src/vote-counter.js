class VoteCounter extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});

        const downvoteButton = document.createElement('button');
        downvoteButton.setAttribute('class', 'downvote');
        downvoteButton.innerHTML = '&#8595;';
        downvoteButton.addEventListener('click', () => this.decrementVotes());
        this.counter = document.createElement('span');
        this.setAttribute('count', '0');
        this.renderCount();
        const upvoteButton = document.createElement('button');
        upvoteButton.setAttribute('class', 'upvote');
        upvoteButton.innerHTML = '&#8593;';
        upvoteButton.addEventListener('click', () => this.incrementVotes());

        const slot = document.createElement('slot');

        const styles = document.createElement('style');
        styles.textContent = this.getStyling();

        this.shadowRoot.append(styles, downvoteButton, this.counter, slot, upvoteButton);
    }

    renderCount() {
        this.counter.textContent = this.getAttribute('count');
    }

    incrementVotes() {
        const count = this.getAttribute('count');
        this.setAttribute('count', `${parseInt(count) + 1}`);
    }

    decrementVotes() {
        if (parseInt(this.getAttribute('count')) === 0) {
            return;
        }
        const count = this.getAttribute('count');
        this.setAttribute('count', `${parseInt(count) - 1}`);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.count = newValue;
        this.renderCount();
    }

    static get observedAttributes() {
        return ['count'];
    }

    getStyling() {
        return `
            :host {
                display: flex;
                align-items: center;
            }
            
            span {
                margin-right: 0.5rem;
            }         
            
            button {
                width: 2rem;
                height: 2rem;
                color: white;
                border: none;
                margin: 0 1rem;
                font-size: 1.3rem;
                cursor: pointer;
                border-radius: 0.2rem;
            }
            
            button.downvote {
                background-color: red;
            }
            
            button.upvote {
                background-color: green;
            }
            
             button:focus {
                border: none;
            }
        `;
    }
}

export default VoteCounter;
