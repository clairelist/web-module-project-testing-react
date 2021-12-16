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


test('renders same number of options seasons are passed in', ()=>{
    render(<Show show={testShow} selectedSeason={'none'} />);

    //first, must select all the seasons options as we see in our ui... 
    //by test id, yay

    const seasonOptionSel = screen.queryAllByTestId('season-option');

    expect(seasonOptionSel).toHaveLength(3); //whoda thunk, toHaveLength is a built in method, LOL
});

test('handleSelect is called when an season is selected', () => {
    const handleSelect=jest.fn();
    //we need a mock, to handle the call being asked after

    render(<Show show={testShow} selectedSeason={'none'} handleSelect={handleSelect}/>);
    //then, pass in our mock to props...

    const select = screen.getByLabelText('Select A Season');

    userEvent.selectOptions(select,['1']);

    //...finally, we can expect our mock to be called:
    expect(handleSelect).toBeCalled(); 

    //yes, it really is that easy future claire lol

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => {
   const {rerender} = render(<Show show={testShow} selectedSeason={'none'}/>);

    let seasonCheck = screen.queryByText('Episode 1');

    //auch:
    let epComponentCheck = screen.queryByTestId('episodes-container');

    stimmt(!seasonCheck); //since I was too lazy to wrap toBeFalsy(), I simply check the truth of the opposite of this value here
   // expect(epComponentCheck).toBeFalsy();

   expect(seasonCheck).toBeFalsy();
   stimmt(!epComponentCheck);

   //now, we test the rerender with selectedSeason stuff!

   rerender(<Show show={testShow} selectedSeason={1}/>)
  //by some form of magic, it works.
  epComponentCheck = screen.queryByTestId('episodes-container');
 //  expect(epComponentCheck).toBeInTheDocument();
  stimmt(epComponentCheck);
});

// * [X] Build an example data structure that contains the show data in the correct format. A show should contain a name, a summary and an array of seasons, each with a id, name and an (empty) list of episodes within them. Use console.logs within the client code if you need to to verify the structure of show data.
// * [X] Test that the Show component renders when your test data is passed in through show prop and "none" is passed in through selectedSeason prop.
// * [X] Test that the Loading component displays when null is passed into the show prop (look at the Loading component to see how to test for it's existence)
// * [X] Test that when your test data is passed through the show prop, the same number of season select options appear as there are seasons within your test data.
// * [X] Test that when an item is selected, the handleSelect function is called. Look at your code to see how to get access to the select DOM element and [userEvent reference materials](https://testing-library.com/docs/ecosystem-user-event/) to see how to trigger a selection.
// * [X] Test that the episode component DOES NOT render when the selectedSeason props is "none" and DOES render the episode component when the selectedSeason prop has a valid season index.