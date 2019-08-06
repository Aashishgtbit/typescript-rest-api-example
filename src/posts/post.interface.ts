/**
 * @Post @interface is used to provide the type to the Post object .
 * @Post object will contain fields
 * @author of type string
 * @content of type string
 * @title of type string
 */

interface Post {
  author: string;
  content: string;
  title: string;
}

export default Post;
