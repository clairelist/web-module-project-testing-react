import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Episode from './../Episode';

//DATA NEEDFUL: DUMMY DATA OF TEST EPISODE
//const {id, image, name, season, number, summary, runtime} = episode;

const testEpisode = {
id: 1,
image: 'https://static.tvmaze.com/uploads/images/medium_portrait/373/933043.jpg',
name: 'Test Name',
season: 1,
number: 1,
summary: 'Test Summaryryi Hey remember when I used to write things ahahahahaha',
runtime: '69:69'
};

const nullImgEp = {
    id: 1,
    image: null,
    name: 'Test Name',
    season: 1,
    number: 1,
    summary: 'Test Summaryryi Hey remember when I used to write things ahahahahaha',
    runtime: '69:69'
    };

const stimmt=(variable)=>{
    return expect(variable).toBeTruthy();
}
//--i made a wrapping function because the word 'truthy' is extremly cringe, as the kids say.

test("renders without error", () => {
    render(<Episode episode={testEpisode} />);
});

test("renders the summary test passed as prop", ()=>{
    render(<Episode episode={testEpisode}/>);

    const summarySel = screen.queryByText('Test Summaryryi Hey remember when I used to write things ahahahahaha');

    expect(summarySel).toBeInTheDocument();
    stimmt(summarySel);
    expect(summarySel).toHaveTextContent('Test Summaryryi Hey remember when I used to write things ahahahahaha');

    //note from past Claire:: toHaveValue() can only be used for input fields ie.

});

test("renders default image when image is not defined", ()=>{
    render(<Episode episode={nullImgEp} />);

    const imgSel = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png');
    expect(imgSel).toBeInTheDocument();

});
