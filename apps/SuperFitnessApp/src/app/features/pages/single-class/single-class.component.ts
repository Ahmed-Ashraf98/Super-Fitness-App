import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MusclesService } from '../../../core/services/muscles/muscles.service';
import { MuscleGroupDetail, Exercise } from '../../../core/models/allMuscles';
import { FormsModule } from '@angular/forms';
import { ThemeManagerService } from '../../../core/services/ThemeManger/ThemeManagerService.service';

@Component({
  selector: 'app-single-class',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './single-class.component.html',
  styleUrls: ['./single-class.component.scss']
})
export class SingleClassComponent implements OnInit {
  muscleGroupDetail: MuscleGroupDetail | null = null;
  exercises: Exercise[] = [];
  selectedExercise: Exercise | null = null;
  selectedDifficulty: string = '67c797e226895f87ce0aa94b'; // Beginner by default
  loading = true;
  error = '';
  themeVal = false;

  difficultyLevels = [
    { id: '67c797e226895f87ce0aa94b', name: 'Beginner' },
    { id: '67c797e226895f87ce0aa94c', name: 'Intermediate' },
    { id: '67c797e226895f87ce0aa94d', name: 'Advanced' }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private musclesService: MusclesService,
    private themeService: ThemeManagerService
  ) {}

  ngOnInit() {
    const groupId = this.route.snapshot.paramMap.get('id');
    if (groupId) {
      this.loadMuscleGroupDetail(groupId);
      this.loadExercises(groupId);
    }

    this.themeVal = this.themeService.getCurrentTheme() === 'dark';
  }

  loadMuscleGroupDetail(groupId: string) {
    this.musclesService.getMuscleGroupDetail(groupId).subscribe({
      next: (response) => {
        this.muscleGroupDetail = response.muscleGroup;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load muscle group details';
        this.loading = false;
        console.error('Error loading muscle group detail:', error);
      }
    });
  }

  loadExercises(groupId: string) {
    this.musclesService.getRandomExercises(groupId, this.selectedDifficulty, 5).subscribe({
      next: (response) => {
        this.exercises = response.exercises;
      },
      error: (error) => {
        console.error('Error loading exercises:', error);
      }
    });
  }

  onDifficultyChange() {
    const groupId = this.route.snapshot.paramMap.get('id');
    if (groupId) {
      this.loadExercises(groupId);
    }
  }

  goBack() {
    this.router.navigate(['/classes']);
  }

  playVideo(videoUrl: string) {
    if (videoUrl) {
      window.open(videoUrl, '_blank');
    }
  }

  selectExercise(exercise: Exercise) {
    this.selectedExercise = exercise;
  }

  getVideoThumbnail(videoUrl: string): string {
    // Extract video ID from YouTube URL and return thumbnail
    const videoId = this.extractYouTubeVideoId(videoUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/assets/images/exercise-placeholder.jpg';
  }

  private extractYouTubeVideoId(url: string): string | null {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }
}
