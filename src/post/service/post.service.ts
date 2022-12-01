import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from '../dto/post.dto.';
import { Post } from '../post.interface';

@Injectable()

export class PostService {
    private lastPostId = 0;
    private posts: Post[] = []

    getAllPosts() {
        return this.posts
    }

    getPostById(id: number) {
        const post = this.posts.find((post: Post) => post.id === id)
        if (post) {
            return post
        }

        throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }

    replacePost(id: number, post: UpdatePostDto) {
        const postIndex = this.posts.findIndex((item: any) => item.id === String(id))
        if (postIndex > 0) {
            this.posts[postIndex] = <Post>post;
            return post
        }

        throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
    }

    async createPost(post: any) {
        const postId: any = this.posts ? this.posts.filter((posts: Post) => posts.id === post.id) : this.posts
        if(postId?.length === 0) {
            const newPost = {
                id: ++this.lastPostId, ...post,
            }
            this.posts.push(<Post>newPost)
        return newPost
        }  throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
       
    }

    deletePost(id: number) {
        const postIndex = this.posts.findIndex((post: Post) => post.id === id)
        if (postIndex > -1) {
            this.posts.slice(postIndex, 1)
        } else {
            throw new HttpException('Post not found', HttpStatus.NOT_FOUND)
        }
    }


}
