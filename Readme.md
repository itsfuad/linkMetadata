# Metadata parser
Parses metadata from link for social media preview.

Use: 
```js
import { getLinkMetadata } from 'link-metadata';

const message = 'Visit page: https://facebook.com/artist.brother';

const response = getLinkMetadata(message); 

/*
Output:
{
    success: true,
    data: {
        title,
        description,
        image,
        url,
    },
};
*/
```