import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Show from './../Show';

import {stimmt} from './Episode.test';

//MEHR DATA:: a 'show' object with name, seasons array MIT:: > id, name and an empty list of episodes (obj)

const testShow = {
    name: 'test name',
    summary: 'test summary',
    seasons: [
        { id:0, name:'Season 1', episodes:[] },
        { id:1, name:'Season 2', episodes:[] },
        { id:2, name:'Season 3', episodes:[] },
    ]
}

test('renders without errors', ()=>{
    render(<Show show={testShow} selectedSeason={'none'}/>)
});

test('renders Loading component when prop show is null', () => {
    render(<Show show={null} />);

    const loadingSel = screen.queryByTestId('loading-container');

    stimmt(loadingSel);
});


test('renders same number of options seasons are passed in', ()=>{});

test('handleSelect is called when an season is selected', () => {});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {});

// * [X] Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and an (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
// * [X] Test that the Show component renders when your test data is passed in through show prop and "none" is passed in through selectedSeason prop.
// * [X] Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existence)
// * [ ] Test that when your test data is passed through the show prop, the same number of season select options appear as there are seasons within your test data.
// * [ ] Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select DOM element and [userEvent reference materials](https://testing-library.com/docs/ecosystem-user-event/) to see how to trigger a selection.
// * [ ] Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.