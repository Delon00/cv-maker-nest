import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { PrismaClient } from '@prismaClient/client'; 
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

// Charge les variables d'environnement immédiatement
dotenv.config();

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const databaseUrl = process.env.DATABASE_URL;

    // 1. Vérification de sécurité
    if (!databaseUrl) {
      throw new Error('DATABASE_URL is not defined in .env file');
    }

    // 2. Création du pool avec l'URL explicite
    const pool = new Pool({ 
      connectionString: databaseUrl,
    });
    
    // 3. Connexion de l'adaptateur
    const adapter = new PrismaPg(pool);
    
    // 4. Initialisation du client
    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('Prisma connected successfully via Postgres Adapter');
    } catch (error) {
      this.logger.error('Failed to connect to database', error);
      throw error;
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}