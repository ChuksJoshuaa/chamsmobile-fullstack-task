import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { UpdateResult } from 'typeorm';
import { PostsService } from '../provider/post.service';
import { PostInterface } from '../utils/interface';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}
  @Post()
  async create(@Body() createPostDto: PostInterface) {
    const findPost = await this.postsService.findOne(createPostDto.title);
    if (findPost) {
      throw new Error('Post has been created already');
    }
    const post = await this.postsService.create(createPostDto);
    if (!post) {
      return 'error in creating post';
    }
    return post;
  }
  @Get()
  async findAll(@Req() request: Request) {
    const posts: Array<PostInterface> = await this.postsService.findAll();
    return posts;
  }
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: PostInterface) {
    const updatePost: UpdateResult = await this.postsService.update(id, body);
    return await this.postsService.findOne(body.title);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    await this.postsService.delete(id);
    return 'POST deleted';
  }
}
