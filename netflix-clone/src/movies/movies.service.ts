import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Movie } from '@prisma/client';

@Injectable()
export class MoviesService {
    findUnique: any;
    constructor(private db:PrismaService) {}

    async create(data: Prisma.MovieCreateInput): Promise<Movie> {
        const movie = await this.db.movie.create({ data });
        return movie;
    }

    async findMany(): Promise<Movie[]> {
        const movies = await this.db.movie.findMany();
        return movies;
    }

    async findOne(id: string): Promise<Movie> {
        const movie = await this.db.movie.findUnique({
          where: { id },
        });
    
        if (!movie) {
          throw new NotFoundException('ID nao foi encontrado' );
        }
    
        return movie;  
    }
}
