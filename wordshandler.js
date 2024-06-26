function getRandomWords(jsonData, count = 4) {
    const shuffled = jsonData.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, count);
    const wordList = selected.map(item => item.word);

    const word1Synonyms = selected[0].synonyms;
    const word2Synonyms = selected[1].synonyms;
    const word3Synonyms = selected[2].synonyms;
    const word4Synonyms = selected[3].synonyms;

    return {
        wordList,
        word1Synonyms,
        word2Synonyms,
        word3Synonyms,
        word4Synonyms
    };
}

