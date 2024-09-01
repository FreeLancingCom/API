import stopword from 'stopword';

const arabicNormalizationMap = {
    'أ': 'ا',
    'إ': 'ا',
    'آ': 'ا',
    'ى': 'ي',
    'ة': 'ه',
    'ؤ': 'و',
    'ئ': 'ي'
};

const removeDiacritics = (text) => {
    // Remove Arabic diacritics
    return text.replace(/[\u064B-\u065F]/g, '');
};

const normalizeArabic = (text) => {
    let normalizedText = text;

    // Replace Arabic characters with their normalized form
    for (let key in arabicNormalizationMap) {
        normalizedText = normalizedText.replace(new RegExp(key, 'g'), arabicNormalizationMap[key]);
    }

    // Remove diacritics
    normalizedText = removeDiacritics(normalizedText);

    return normalizedText;
};

export const searchSelectorsFun = (input) => {
    const searchField = input.searchField;
    const filters = {};

    let conditions = [];

    let normalizedInput = "";


    if (searchField) {
        // Normalize Arabic text
        if (/[\u0600-\u06FF]/.test(searchField)) {
            normalizedInput = normalizeArabic(searchField);
        } else {
            // Convert to lowercase
            normalizedInput = searchField.toLowerCase().trim();
            // Remove special characters
            normalizedInput = normalizedInput.replace(/[^\w\s]/gi, '');
            // Remove common stopwords
            normalizedInput = stopword.removeStopwords(normalizedInput.split(' ')).join(' ');
        }

        conditions.push({
            $or: [
                { name: { $regex: normalizedInput, $options: 'i' } },
                { nameAr: { $regex: normalizedInput, $options: 'i' } },
            ]
        });
    }

    if (input.status) {
        conditions.push({
            $or: [
                { status: input.status },
            ]
        });
    }

    if (conditions.length > 0) {
        filters.$and = conditions;
    }

    return filters;
};