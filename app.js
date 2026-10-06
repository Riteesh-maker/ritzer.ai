
/* =========================================
   RITZER AI
   Main Application
========================================= */


const chat = document.getElementById("chat");

const input =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const newChatButton =
    document.getElementById("newChat");

const themeButton =
    document.getElementById("themeButton");

const clearButton =
    document.getElementById("clearButton");

const historyBox =
    document.getElementById("chatHistory");

const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.getElementById("sidebar");


/* =========================================
   STORAGE
========================================= */

const HISTORY_KEY =
    "ritzer_ai_history";

const THEME_KEY =
    "ritzer_ai_theme";


let conversations =
    JSON.parse(
        localStorage.getItem(HISTORY_KEY)
    ) || [];


/* =========================================
   INITIALIZATION
========================================= */

loadTheme();

renderHistory();

input.focus();


/* =========================================
   SEND MESSAGE
========================================= */

async function sendMessage() {

    const text =
        input.value.trim();

    if (!text)
        return;


    hideWelcome();

    addMessage(
        text,
        "user"
    );


    saveConversation(text);


    input.value = "";

    resizeInput();


    showTyping();


    /*
        DEMO MODE

        This gives the website
        immediate functionality.

        Later we can replace this
        with your real AI backend.
    */

    await wait(900);


   removeTyping();

try {
    const response = await fetch(
        "https://small-credit-692f.ballakaririteesh.workers.dev",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                message: text
            })
        }
    );

    const data = await response.json();

    const answer = data.response || data.error || "No response received.";

    addMessage(answer, "ai");

} catch (error) {
    addMessage("Connection error: " + error.message, "ai");
}
}


/* =========================================
   ADD MESSAGE
========================================= */

function addMessage(text, type) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "message";


    const avatar =
        document.createElement("div");

    avatar.className =
        "avatar";


    if (type === "user") {

        avatar.classList.add(
            "user-avatar"
        );

        avatar.textContent =
            "YOU";

    } else {

        avatar.textContent =
            "R";

    }


    const content =
        document.createElement("div");

    content.className =
        "message-content";


    content.textContent =
        text;


    wrapper.appendChild(
        avatar
    );

    wrapper.appendChild(
        content
    );


    if (type === "ai") {

        const copy =
            document.createElement("button");

        copy.className =
            "copy-button";

        copy.textContent =
            "Copy";

        copy.onclick =
            () => copyText(
                text,
                copy
            );

        content.appendChild(
            copy
        );

    }


    chat.appendChild(
        wrapper
    );


    scrollToBottom();

}


/* =========================================
   DEMO RESPONSE ENGINE
========================================= */

function generateResponse(text) {

    const lower =
        text.toLowerCase();


    if (
        lower.includes("hello") ||
        lower.includes("hi")
    ) {

        return (
            "Hello! 👋\n\n" +
            "I'm RITZER AI. " +
            "I'm ready to help you learn, " +
            "create and build."
        );

    }


    if (
        lower.includes("who are you") ||
        lower.includes("what are you")
    ) {

        return (
            "I'm RITZER AI, an AI assistant " +
            "interface created for this project."
        );

    }


    if (
        lower.includes("artificial intelligence") ||
        lower.includes("what is ai")
    ) {

        return (
            "Artificial intelligence (AI) is " +
            "technology that allows computers " +
            "to perform tasks that normally " +
            "require human-like intelligence, " +
            "such as understanding language, " +
            "recognizing patterns and generating content."
        );

    }


    if (
        lower.includes("javascript")
    ) {

        return (
            "JavaScript is a programming language " +
            "that makes websites interactive. " +
            "It can also be used for servers, " +
            "games, applications and many other projects."
        );

    }


    if (
        lower.includes("html")
    ) {

        return (
            "HTML provides the structure of a webpage. " +
            "CSS controls its appearance, while " +
            "JavaScript adds behaviour and interaction."
        );

    }


    if (
        lower.includes("website")
    ) {

        return (
            "A good website needs three things: " +
            "a clear purpose, a simple interface " +
            "and useful functionality. " +
            "RITZER AI can be expanded into a complete " +
            "AI-powered website."
        );

    }


    if (
        lower.includes("startup")
    ) {

        return (
            "Here's a simple startup idea: build " +
            "an AI study assistant for students " +
            "that turns lessons into revision notes, " +
            "practice questions and quizzes."
        );

    }


    if (
        lower.includes("code")
    ) {

        return (
            "I can help you build software step by step. " +
            "Tell me what you want to create and " +
            "which programming language you want to use."
        );

    }


    return (
        "I understand your message.\n\n" +
        "RITZER AI is currently running in " +
        "local demo mode. The next step is " +
        "connecting this interface to a real AI model."
    );

}


/* =========================================
   SAVE CONVERSATION
========================================= */

function saveConversation(text) {

    conversations.unshift({
        title: text,
        time: Date.now()
    });


    conversations =
        conversations.slice(
            0,
            30
        );


    localStorage.setItem(
        HISTORY_KEY,
        JSON.stringify(
            conversations
        )
    );


    renderHistory();

}


/* =========================================
   HISTORY
========================================= */

function renderHistory() {

    historyBox.innerHTML = "";


    conversations.forEach(
        (conversation) => {

            const item =
                document.createElement("div");

            item.className =
                "history-item";

            item.textContent =
                conversation.title;


            item.title =
                conversation.title;


            historyBox.appendChild(
                item
            );

        }
    );

}


/* =========================================
   NEW CHAT
========================================= */

newChatButton.addEventListener(
    "click",
    () => {

        chat.innerHTML = `

            <div
                class="welcome"
                id="welcome">

                <div class="welcome-logo">
                    R
                </div>

                <h1>
                    Welcome to
                    <span>RITZER AI</span>
                </h1>

                <p>
                    Your intelligent AI assistant
                    for learning, creating and building.
                </p>

            </div>

        `;

        input.focus();

    }
);


/* =========================================
   CLEAR HISTORY
========================================= */

clearButton.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Delete all RITZER AI chat history?"
            );


        if (!confirmed)
            return;


        conversations = [];


        localStorage.removeItem(
            HISTORY_KEY
        );


        renderHistory();

    }
);


/* =========================================
   THEME
========================================= */

themeButton.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "light"
        );


        const light =
            document.body.classList.contains(
                "light"
            );


        localStorage.setItem(
            THEME_KEY,
            light
                ? "light"
                : "dark"
        );

    }
);


function loadTheme() {

    const theme =
        localStorage.getItem(
            THEME_KEY
        );


    if (theme === "light") {

        document.body.classList.add(
            "light"
        );

    }

}


/* =========================================
   MOBILE MENU
========================================= */

menuButton.addEventListener(
    "click",
    () => {

        sidebar.classList.toggle(
            "open"
        );

    }
);


/* =========================================
   SUGGESTIONS
========================================= */

document
    .querySelectorAll(".suggestion")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                input.value =
                    button.dataset.prompt;

                sendMessage();

            }
        );

    });


/* =========================================
   ENTER TO SEND
========================================= */

input.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


/* =========================================
   AUTO RESIZE
========================================= */

input.addEventListener(
    "input",
    resizeInput
);


function resizeInput() {

    input.style.height =
        "auto";


    input.style.height =
        Math.min(
            input.scrollHeight,
            160
        ) + "px";

}


/* =========================================
   TYPING
========================================= */

function showTyping() {

    const message =
        document.createElement("div");

    message.className =
        "message";

    message.id =
        "typing";


    message.innerHTML = `

        <div class="avatar">
            R
        </div>

        <div class="message-content">

            <div class="typing">

                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>

            </div>

        </div>

    `;


    chat.appendChild(
        message
    );


    scrollToBottom();

}


function removeTyping() {

    const typing =
        document.getElementById(
            "typing"
        );


    if (typing) {

        typing.remove();

    }

}


/* =========================================
   COPY
========================================= */

async function copyText(
    text,
    button
) {

    try {

        await navigator.clipboard.writeText(
            text
        );


        button.textContent =
            "Copied!";


        setTimeout(
            () => {

                button.textContent =
                    "Copy";

            },
            1500
        );

    } catch {

        button.textContent =
            "Failed";

    }

}


/* =========================================
   UTILITIES
========================================= */

function hideWelcome() {

    const welcome =
        document.getElementById(
            "welcome"
        );


    if (welcome) {

        welcome.style.display =
            "none";

    }

}


function scrollToBottom() {

    chat.scrollTop =
        chat.scrollHeight;

}


function wait(ms) {

    return new Promise(
        resolve =>
            setTimeout(
                resolve,
                ms
            )
    );

}

