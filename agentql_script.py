"""This script serves as a skeleton template for synchronous AgentQL scripts."""

import logging

import agentql
from agentql.ext.playwright.sync_api import Page
from playwright.sync_api import sync_playwright

# Set up logging
logging.basicConfig(level=logging.INFO)
log = logging.getLogger(__name__)

# Set the URL to the desired website
URL = "https://app.gohighlevel.com/v2/location/uvXy1lPk9FDDIkFc12el/conversations/conversations/B0095msTzhprc2XOv33C"


def main():
    with sync_playwright() as p, p.chromium.launch(headless=False) as browser:
        # Create a new page in the browser and wrap it to get access to the AgentQL's querying API
        page = agentql.wrap(browser.new_page())

        # Navigate to the desired URL
        page.goto(URL)

        get_response(page)


def get_response(page: Page):
    query = """
{
    contact_name
    contact_id
    chats[]{
        sender
        message
        time
        date
    }
    
}
    """

    response = page.query_data(query)

    # For more details on how to consume the response, refer to the documentation at https://docs.agentql.com/intro/main-concepts
    print(response)


if __name__ == "__main__":
    main()


{{ $json.startAfterId || 'WGFKscJ5yIbo4KWY6yHJ' }}