export default function dbTimeForHuman(str) {
    const formattedTime = str.replace('T', ' ').substring(0, 16);
    console.log("Formatted Time:", formattedTime);
    return formattedTime;
  }
  