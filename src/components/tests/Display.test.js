import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Display from './../Display';
import mockFetchShow from './../../api/fetchShow';

jest.mock('./../../api/fetchShow');

const testShow = {
    name: 'test name',
    summary: 'test summary',
    seasons: [
        { id:0, name:'Season 1', episodes:[] },
        { id:1, name:'Season 2', episodes:[] },
        { id:2, name:'Season 3', episodes:[] },
    ]
}


test('renders without errors with no props', ()=>{

    render(<Display />);

});

test('renders Show component when the button is clicked ', async ()=>{
    mockFetchShow.mockResolvedValueOnce(testShow); //must mock this api call, and make the call asyncronous,
    //so it will actually work !

    render(<Display />);
    const buttonSel=screen.getByRole('button');
    userEvent.click(buttonSel);

    const show = await screen.findByTestId('show-container');

    expect(show).toBeInTheDocument();
});

test('renders show season options matching your data when the button is clicked', async ()=>{ //AWAIT WAITFOR METHOD
    mockFetchShow.mockResolvedValueOnce(testShow); //must mock this api call, and make the call asyncronous,
    //so it will actually work !

    render(<Display />);
    const buttonSel=screen.getByRole('button');
    userEvent.click(buttonSel);

    await waitFor(()=>{
        const seasonOptions = screen.queryAllByTestId('season-option');
        expect(seasonOptions).toHaveLength(3); 
    })
});

test('when fetch button pressed, correct function is called', async ()=>{ //'displayFunc'
    //use TWO mocks here!

    mockFetchShow.mockResolvedValueOnce(testShow); //mock calling api

    const displayFunc=jest.fn(); // mock display function; this is our mock displayFunc, to be passed in since we are tyring to determine if the3 function is being called !

    render(<Display displayFunc={displayFunc}/>);

    const buttonSel=screen.getByRole('button');
    userEvent.click(buttonSel);

    //now, handle expect on displayFunc being called, in an awaitFor::

    await waitFor(()=>{
        expect(displayFunc).toHaveBeenCalled();
    })
})

// * [X] Test that the Display component renders without any passed in props.
// * [X] Rebuild or copy the show test data element as used in the previous set of tests.
// * [X] Test that when the fetch button is pressed, the show component will display. Make sure to account for the api call and change of state in building your test.
// * [X] Test that when the fetch button is pressed, the amount of select options rendered is equal to the amount of seasons in your test data.
// * [X] Notice the optional functional prop passed in to the Display component client code. Test that when the fetch button is pressed, this function is called.