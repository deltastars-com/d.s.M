import { describe, it, expect, beforeEach } from 'vitest';
import {
  createTheme,
  updateTheme,
  activateTheme,
  deleteTheme,
  createFont,
  updateFont,
  activateFont,
  deleteFont,
  createSection,
  updateSection,
  reorderSections,
  deleteSection,
  createPage,
  updatePage,
  publishPage,
  deletePage,
  createNavigationItem,
  updateNavigationItem,
  reorderNavigationItems,
  deleteNavigationItem,
  logDeveloperActivity,
  generateAPIKey,
  validateAPIKey,
  createBackup,
  restoreBackup,
} from './developer';

describe('Developer Panel Services', () => {
  describe('Theme Management', () => {
    it('should create a new theme', async () => {
      const theme = await createTheme({
        name: 'Dark Green',
        description: 'A dark green theme',
        primaryColor: '#22c55e',
        secondaryColor: '#16a34a',
        accentColor: '#84cc16',
        backgroundColor: '#1a1a1a',
        foregroundColor: '#ffffff',
        mutedColor: '#666666',
        isDark: true,
        createdBy: 1,
      });

      expect(theme).not.toBeNull();
      expect(theme?.name).toBe('Dark Green');
      expect(theme?.primaryColor).toBe('#22c55e');
    });

    it('should update a theme', async () => {
      const updated = await updateTheme(1, {
        name: 'Updated Theme',
        primaryColor: '#ff0000',
      });

      expect(updated).not.toBeNull();
      expect(updated?.name).toBe('Updated Theme');
      expect(updated?.primaryColor).toBe('#ff0000');
    });

    it('should activate a theme', async () => {
      const result = await activateTheme(1);
      expect(result).toBe(true);
    });

    it('should delete a theme', async () => {
      const result = await deleteTheme(1);
      expect(result).toBe(true);
    });
  });

  describe('Font Management', () => {
    it('should create a new font', async () => {
      const font = await createFont({
        name: 'Cairo',
        fontFamily: 'Cairo, sans-serif',
        fontUrl: 'https://fonts.googleapis.com/css2?family=Cairo',
        headingSize: '32px',
        bodySize: '16px',
        smallSize: '14px',
        headingWeight: '700',
        bodyWeight: '400',
        createdBy: 1,
      });

      expect(font).not.toBeNull();
      expect(font?.name).toBe('Cairo');
      expect(font?.fontFamily).toBe('Cairo, sans-serif');
    });

    it('should update a font', async () => {
      const updated = await updateFont(1, {
        name: 'Updated Font',
        headingSize: '36px',
      });

      expect(updated).not.toBeNull();
      expect(updated?.name).toBe('Updated Font');
      expect(updated?.headingSize).toBe('36px');
    });

    it('should activate a font', async () => {
      const result = await activateFont(1);
      expect(result).toBe(true);
    });

    it('should delete a font', async () => {
      const result = await deleteFont(1);
      expect(result).toBe(true);
    });
  });

  describe('Section Management', () => {
    it('should create a new section', async () => {
      const section = await createSection({
        name: 'Hero Section',
        nameAr: 'قسم البطل',
        slug: 'hero-section',
        type: 'hero',
        title: 'Welcome',
        titleAr: 'أهلا وسهلا',
        description: 'Hero section description',
        descriptionAr: 'وصف قسم البطل',
        createdBy: 1,
      });

      expect(section).not.toBeNull();
      expect(section?.name).toBe('Hero Section');
      expect(section?.slug).toBe('hero-section');
    });

    it('should update a section', async () => {
      const updated = await updateSection(1, {
        name: 'Updated Section',
        order: 2,
      });

      expect(updated).not.toBeNull();
      expect(updated?.name).toBe('Updated Section');
      expect(updated?.order).toBe(2);
    });

    it('should reorder sections', async () => {
      const result = await reorderSections([
        { id: 1, order: 1 },
        { id: 2, order: 2 },
        { id: 3, order: 3 },
      ]);

      expect(result).toBe(true);
    });

    it('should delete a section', async () => {
      const result = await deleteSection(1);
      expect(result).toBe(true);
    });
  });

  describe('Page Management', () => {
    it('should create a new page', async () => {
      const page = await createPage({
        title: 'About Us',
        titleAr: 'من نحن',
        slug: 'about-us',
        content: 'About us content',
        contentAr: 'محتوى من نحن',
        metaDescription: 'About our company',
        metaKeywords: 'about, company',
        isPublished: true,
        createdBy: 1,
      });

      expect(page).not.toBeNull();
      expect(page?.title).toBe('About Us');
      expect(page?.slug).toBe('about-us');
    });

    it('should update a page', async () => {
      const updated = await updatePage(1, {
        title: 'Updated Page',
        content: 'Updated content',
      });

      expect(updated).not.toBeNull();
      expect(updated?.title).toBe('Updated Page');
      expect(updated?.content).toBe('Updated content');
    });

    it('should publish a page', async () => {
      const result = await publishPage(1);
      expect(result).toBe(true);
    });

    it('should delete a page', async () => {
      const result = await deletePage(1);
      expect(result).toBe(true);
    });
  });

  describe('Navigation Management', () => {
    it('should create a navigation item', async () => {
      const item = await createNavigationItem({
        label: 'Home',
        labelAr: 'الرئيسية',
        url: '/',
        order: 1,
        icon: 'home',
        target: '_self',
        createdBy: 1,
      });

      expect(item).not.toBeNull();
      expect(item?.label).toBe('Home');
      expect(item?.url).toBe('/');
    });

    it('should update a navigation item', async () => {
      const updated = await updateNavigationItem(1, {
        label: 'Updated',
        url: '/updated',
      });

      expect(updated).not.toBeNull();
      expect(updated?.label).toBe('Updated');
      expect(updated?.url).toBe('/updated');
    });

    it('should reorder navigation items', async () => {
      const result = await reorderNavigationItems([
        { id: 1, order: 1 },
        { id: 2, order: 2 },
      ]);

      expect(result).toBe(true);
    });

    it('should delete a navigation item', async () => {
      const result = await deleteNavigationItem(1);
      expect(result).toBe(true);
    });
  });

  describe('Activity Logging', () => {
    it('should log developer activity', async () => {
      const log = await logDeveloperActivity({
        developerId: 1,
        action: 'create',
        entityType: 'theme',
        entityId: 1,
        entityName: 'New Theme',
        changes: { name: 'New Theme' },
      });

      expect(log).not.toBeNull();
      expect(log?.action).toBe('create');
      expect(log?.entityType).toBe('theme');
    });
  });

  describe('API Key Management', () => {
    it('should generate API key', async () => {
      const keys = await generateAPIKey(1);

      expect(keys).not.toBeNull();
      expect(keys?.apiKey).toMatch(/^sk_live_/);
      expect(keys?.apiSecret).toBeDefined();
    });

    it('should validate API key', async () => {
      const keys = await generateAPIKey(1);
      if (keys) {
        const developerId = await validateAPIKey(keys.apiKey);
        expect(developerId).toBe(1);
      }
    });
  });

  describe('Backup & Restore', () => {
    it('should create a backup', async () => {
      const backup = await createBackup(1);

      expect(backup).not.toBeNull();
      expect(backup?.backupId).toBeDefined();
      expect(backup?.createdAt).toBeDefined();
    });

    it('should restore a backup', async () => {
      const backup = await createBackup(1);
      if (backup) {
        const result = await restoreBackup(backup.backupId);
        expect(result).toBe(true);
      }
    });
  });
});
