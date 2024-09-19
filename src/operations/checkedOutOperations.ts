import CheckedOut, { ICheckedOut } from '../models/CheckedOut';

// Function to post multiple checked-out records
export const postCheckedOut = async (
    checkedOuts: ICheckedOut[]
): Promise<ICheckedOut[] | null> => {
    try {
        const savedCheckedOuts = await CheckedOut.insertMany(checkedOuts);
        return savedCheckedOuts;
    } catch (error) {
        console.error('Error posting checked-out records:', error);
        return null;
    }
};

// Function to get checked-out records by full name
export const getCheckedOutByFullName = async (fullName: string): Promise<ICheckedOut[] | null> => {
    try {
        const checkedOutRecords = await CheckedOut.find({ fullName });
        return checkedOutRecords;
    } catch (error) {
        console.error('Error retrieving checked-out records:', error);
        return null;
    }
};
