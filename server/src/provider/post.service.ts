import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Post } from '../entities/Post.entity';
import { PostInterface } from '../utils/interface';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<PostInterface>,
  ) {}
  create(post: PostInterface): Promise<PostInterface> {
    return this.postRepository.save(this.postRepository.create(post));
  }
  findAll(): Promise<PostInterface[]> {
    return this.postRepository.find({
      order: {
        title: 'DESC',
      },
    });
  }

  findOne(title: string): Promise<PostInterface> {
    return this.postRepository.findOne({ where: { title: title } });
  }

  update(id: number, data: PostInterface): Promise<UpdateResult> {
    return this.postRepository
      .createQueryBuilder()
      .update()
      .set({
        title: data.title,
        description: data.description,
      })
      .where('id = :id', { id })
      .execute();
  }
  delete(id: number): Promise<DeleteResult> {
    return this.postRepository
      .createQueryBuilder()
      .delete()
      .from(Post)
      .where('id = :id', { id })
      .execute();
  }
}
